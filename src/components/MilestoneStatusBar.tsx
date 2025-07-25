import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check } from 'lucide-react';

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  deliverable: string;
}

interface MilestoneStatusBarProps {
  milestones: Milestone[];
  totalGoal: number;
  currentAmount: number;
  className?: string;
}

export function MilestoneStatusBar({ milestones, totalGoal, currentAmount, className }: MilestoneStatusBarProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  
  const progressPercentage = (currentAmount / totalGoal) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-muted rounded-full mb-4 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
        />
      </div>

      {/* Milestone Circles */}
      <div className="relative flex justify-between items-center">
        {milestones.map((milestone, index) => {
          const milestonePercentage = (milestone.amount / totalGoal) * 100;
          const isReached = currentAmount >= milestone.amount;
          
          return (
            <Dialog key={milestone.id}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative p-0 h-auto hover:bg-transparent group"
                  onClick={() => setSelectedMilestone(milestone)}
                >
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 group-hover:scale-110",
                      {
                        "bg-primary border-primary text-primary-foreground": isReached,
                        "bg-background border-primary": milestone.status === 'current' && !isReached,
                        "bg-background border-muted-foreground": milestone.status === 'upcoming' && !isReached
                      }
                    )}
                  >
                    {isReached && <Check className="w-4 h-4" />}
                    {!isReached && milestone.status === 'current' && (
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  {/* Milestone Label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs text-center whitespace-nowrap">
                    <div className="font-medium">${milestone.amount.toLocaleString()}</div>
                    <div className="text-muted-foreground">{milestone.title}</div>
                  </div>
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{milestone.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Funding Goal</h4>
                    <p className="text-2xl font-bold text-primary">${milestone.amount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Description</h4>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Deliverable</h4>
                    <p className="text-muted-foreground">{milestone.deliverable}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div 
                      className={cn(
                        "w-3 h-3 rounded-full",
                        {
                          "bg-green-500": milestone.status === 'completed',
                          "bg-blue-500": milestone.status === 'current',
                          "bg-gray-300": milestone.status === 'upcoming'
                        }
                      )}
                    />
                    <span className="text-sm capitalize text-muted-foreground">
                      {milestone.status === 'completed' ? 'Completed' : 
                       milestone.status === 'current' ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}