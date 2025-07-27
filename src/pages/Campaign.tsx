import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MilestoneStatusBar } from '@/components/MilestoneStatusBar';
import { campaigns } from '@/data/campaigns';

export default function Campaign() {
  const { id } = useParams<{ id: string }>();
  const campaign = campaigns.find(c => c.id === id);

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign Not Found</h1>
          <Button asChild>
            <Link to="/">← Back to Campaigns</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (campaign.currentAmount / campaign.goalAmount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Campaigns
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{campaign.genre}</Badge>
                <Badge variant="outline" className="capitalize">
                  {campaign.status.replace('-', ' ')}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{campaign.shortDescription}</p>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Project Description</h2>
                <p className="text-muted-foreground leading-relaxed">{campaign.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>About the Filmmaker</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">{campaign.filmmaker.name}</h3>
                <p className="text-muted-foreground mb-4">{campaign.filmmaker.bio}</p>
                <div>
                  <h4 className="font-medium mb-2">Previous Works:</h4>
                  <ul className="space-y-1">
                    {campaign.filmmaker.previousWorks.map((work, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {work}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    ${campaign.currentAmount.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">
                    of ${campaign.goalAmount.toLocaleString()} goal
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {Math.round(progressPercentage)}% funded
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{campaign.backers} backers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{campaign.location}</span>
                </div>

                <Button className="w-full" size="lg">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Back This Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <MilestoneStatusBar
                  milestones={campaign.milestones.map(m => ({
                    id: m.id,
                    title: m.title,
                    amount: m.amount,
                    completed: m.status === 'completed'
                  }))}
                  goalAmount={campaign.goalAmount}
                  currentAmount={campaign.currentAmount}
                />
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Click on milestone circles to see detailed breakdown of funding stages and production deliverables.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}