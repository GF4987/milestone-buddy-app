import React, { useState } from 'react';
import { Shield, Eye, FileText, Users, DollarSign, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { campaigns } from '@/data/campaigns';

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.filmmaker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage campaigns, review confidential materials, and oversee platform operations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{campaigns.length}</div>
                  <div className="text-sm text-muted-foreground">Active Campaigns</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    ${campaigns.reduce((total, c) => total + c.currentAmount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((total, c) => total + c.backers, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Backers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(campaigns.reduce((total, c) => total + c.daysLeft, 0) / campaigns.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Days Left</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns by title or filmmaker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Filmmaker</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={campaign.image}
                          alt={campaign.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{campaign.title}</div>
                          <div className="text-sm text-muted-foreground">{campaign.genre}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.filmmaker.name}</div>
                        <div className="text-sm text-muted-foreground">{campaign.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {campaign.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          ${campaign.currentAmount.toLocaleString()} / ${campaign.goalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((campaign.currentAmount / campaign.goalAmount) * 100)}% funded
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCampaign(campaign)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              Campaign Details - {selectedCampaign?.title}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              View confidential campaign information including scripts, budgets, and production details.
                            </p>
                          </DialogHeader>
                          
                          {selectedCampaign && (
                            <Tabs defaultValue="overview" className="mt-4">
                              <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="script">Script</TabsTrigger>
                                <TabsTrigger value="budget">Budget</TabsTrigger>
                                <TabsTrigger value="team">Team</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Project Description</h3>
                                  <p className="text-muted-foreground">{selectedCampaign.description}</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-1">Funding Progress</h4>
                                    <div className="text-lg font-semibold text-primary">
                                      ${selectedCampaign.currentAmount.toLocaleString()} / ${selectedCampaign.goalAmount.toLocaleString()}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">Backers</h4>
                                    <div className="text-lg font-semibold">{selectedCampaign.backers}</div>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="script" className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg">
                                  <h3 className="font-semibold mb-2 text-red-600">CONFIDENTIAL SCRIPT</h3>
                                  <div className="font-mono text-sm whitespace-pre-line">
                                    {selectedCampaign.confidential.script}
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="budget" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-4">Budget Breakdown</h3>
                                  <div className="space-y-2">
                                    {selectedCampaign.confidential.budget.map((item, index) => (
                                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                        <span>{item.category}</span>
                                        <span className="font-semibold">${item.amount.toLocaleString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center font-semibold">
                                      <span>Total Budget</span>
                                      <span className="text-primary">
                                        ${selectedCampaign.confidential.budget.reduce((total, item) => total + item.amount, 0).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="team" className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h3 className="font-semibold mb-3">Cast</h3>
                                    <ul className="space-y-2">
                                      {selectedCampaign.confidential.cast.map((member, index) => (
                                        <li key={index} className="p-2 bg-muted rounded">{member}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h3 className="font-semibold mb-3">Crew</h3>
                                    <ul className="space-y-2">
                                      {selectedCampaign.confidential.crew.map((member, index) => (
                                        <li key={index} className="p-2 bg-muted rounded">{member}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="timeline" className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-4">Production Timeline</h3>
                                  <div className="space-y-3">
                                    {selectedCampaign.confidential.timeline.map((phase, index) => (
                                      <div key={index} className="border rounded-lg p-4">
                                        <div className="font-medium mb-2">{phase.phase}</div>
                                        <div className="text-sm text-muted-foreground">
                                          {phase.startDate} → {phase.endDate}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}