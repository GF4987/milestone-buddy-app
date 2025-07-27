import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2, DollarSign, Target, Camera, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Milestone {
  id: string;
  title: string;
  description: string;
  stage: 'pre-production' | 'production' | 'post-production';
  amount: number;
  completed: boolean;
}

interface BudgetAllocation {
  'pre-production': number;
  'production': number;
  'post-production': number;
}

export default function MilestoneManagement() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get campaign data from the previous page
  const campaignData = location.state || {
    title: 'Untitled Project',
    goalAmount: 25000,
    description: '',
    daysLeft: 30
  };

  const [budgetAllocation, setBudgetAllocation] = useState<BudgetAllocation>({
    'pre-production': 30,
    'production': 50,
    'post-production': 20
  });

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Script Development',
      description: 'Complete the final draft of the screenplay',
      stage: 'pre-production',
      amount: 2500,
      completed: false
    },
    {
      id: '2',
      title: 'Equipment Rental',
      description: 'Secure cameras, lighting, and audio equipment',
      stage: 'production',
      amount: 8000,
      completed: false
    }
  ]);

  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    stage: 'pre-production' as const,
    amount: 0
  });

  const totalBudget = campaignData.goalAmount;
  
  const calculateStageAmount = (stage: keyof BudgetAllocation) => {
    return Math.round((totalBudget * budgetAllocation[stage]) / 100);
  };

  const handleAllocationChange = (stage: keyof BudgetAllocation, value: number) => {
    const newAllocation = { ...budgetAllocation };
    const oldValue = newAllocation[stage];
    const difference = value - oldValue;
    
    // Adjust other stages proportionally
    const otherStages = Object.keys(newAllocation).filter(s => s !== stage) as (keyof BudgetAllocation)[];
    const totalOthers = otherStages.reduce((sum, s) => sum + newAllocation[s], 0);
    
    if (totalOthers > 0) {
      otherStages.forEach(s => {
        const proportion = newAllocation[s] / totalOthers;
        newAllocation[s] = Math.max(0, newAllocation[s] - (difference * proportion));
      });
    }
    
    newAllocation[stage] = value;
    
    // Ensure total is 100%
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const adjustment = (100 - total) / otherStages.length;
      otherStages.forEach(s => {
        newAllocation[s] = Math.max(0, newAllocation[s] + adjustment);
      });
    }
    
    setBudgetAllocation(newAllocation);
  };

  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone,
      completed: false
    };

    setMilestones([...milestones, milestone]);
    setNewMilestone({
      title: '',
      description: '',
      stage: 'pre-production',
      amount: 0
    });
    setIsAddMilestoneOpen(false);
    
    toast({
      title: "Milestone Added",
      description: "Your milestone has been successfully added"
    });
  };

  const deleteMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id));
    toast({
      title: "Milestone Deleted",
      description: "The milestone has been removed"
    });
  };

  const saveCampaign = () => {
    toast({
      title: "Campaign Saved",
      description: "Your campaign and milestones have been saved successfully"
    });
    navigate('/profile');
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'pre-production':
        return <Edit3 className="w-4 h-4" />;
      case 'production':
        return <Camera className="w-4 h-4" />;
      case 'post-production':
        return <Target className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const stageColors = {
    'pre-production': 'bg-blue-100 text-blue-800 border-blue-200',
    'production': 'bg-green-100 text-green-800 border-green-200',
    'post-production': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Milestone Management</h1>
          <p className="text-muted-foreground">Manage your project budget and milestones for "{campaignData.title}"</p>
        </div>

        {/* Budget Allocation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Budget Allocation - ${totalBudget.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {(Object.keys(budgetAllocation) as (keyof BudgetAllocation)[]).map((stage) => (
                <div key={stage} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize flex items-center gap-2">
                      {getStageIcon(stage)}
                      {stage.replace('-', ' ')}
                    </label>
                    <Badge variant="outline" className={stageColors[stage]}>
                      ${calculateStageAmount(stage).toLocaleString()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={budgetAllocation[stage]}
                      onChange={(e) => handleAllocationChange(stage, Number(e.target.value))}
                      className="text-center"
                    />
                    <Progress value={budgetAllocation[stage]} className="h-2" />
                    <p className="text-xs text-center text-muted-foreground">
                      {budgetAllocation[stage]}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Project Milestones</CardTitle>
              <Dialog open={isAddMilestoneOpen} onOpenChange={setIsAddMilestoneOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Milestone
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Milestone</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="milestone-title">Title *</Label>
                      <Input
                        id="milestone-title"
                        value={newMilestone.title}
                        onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                        placeholder="e.g., Equipment Purchase"
                      />
                    </div>
                    <div>
                      <Label htmlFor="milestone-description">Description</Label>
                      <Textarea
                        id="milestone-description"
                        value={newMilestone.description}
                        onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                        placeholder="Describe what this milestone involves..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="milestone-stage">Production Stage</Label>
                      <select
                        id="milestone-stage"
                        value={newMilestone.stage}
                        onChange={(e) => setNewMilestone({...newMilestone, stage: e.target.value as any})}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="pre-production">Pre-Production</option>
                        <option value="production">Production</option>
                        <option value="post-production">Post-Production</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="milestone-amount">Amount ($) *</Label>
                      <Input
                        id="milestone-amount"
                        type="number"
                        value={newMilestone.amount}
                        onChange={(e) => setNewMilestone({...newMilestone, amount: Number(e.target.value)})}
                        placeholder="0"
                      />
                    </div>
                    <Button onClick={addMilestone} className="w-full">
                      Add Milestone
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No milestones yet. Add your first milestone to get started!</p>
                </div>
              ) : (
                milestones.map((milestone) => (
                  <div key={milestone.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <Badge 
                            variant="outline" 
                            className={stageColors[milestone.stage]}
                          >
                            {getStageIcon(milestone.stage)}
                            <span className="ml-1 capitalize">
                              {milestone.stage.replace('-', ' ')}
                            </span>
                          </Badge>
                        </div>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            ${milestone.amount.toLocaleString()}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMilestone(milestone.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back to Campaign Details
          </Button>
          <Button onClick={saveCampaign} className="flex-1">
            Save Campaign & Milestones
          </Button>
        </div>
      </div>
    </div>
  );
}```