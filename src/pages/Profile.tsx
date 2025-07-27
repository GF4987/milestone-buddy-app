import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Film, Plus, Calendar, DollarSign, Users, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Get user's saved campaigns
const getUserCampaigns = () => {
  return JSON.parse(localStorage.getItem('userCampaigns') || '[]');
};

// Mock user data
const userData = {
  username: 'alexfilm_maker',
  email: 'alex@filmmaker.com',
  fullName: 'Alex Johnson',
  bio: 'Independent filmmaker passionate about storytelling and visual narratives. 5+ years experience in documentary and narrative filmmaking.',
  location: 'Los Angeles, CA',
  website: 'www.alexjohnsonfilms.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  memberSince: 'March 2023',
  projects: [
    {
      id: 'urban-stories',
      title: 'Urban Stories',
      status: 'completed',
      goal: 15000,
      raised: 18500,
      backers: 89,
      completedDate: '2024-01-15'
    },
    {
      id: 'digital-dreams',
      title: 'Digital Dreams',
      status: 'active',
      goal: 25000,
      raised: 12300,
      backers: 67,
      daysLeft: 45
    }
  ]
};

export default function Profile() {
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState(getUserCampaigns());
  const { toast } = useToast();
  const navigate = useNavigate();

  // Refresh campaigns when component mounts
  React.useEffect(() => {
    setUserCampaigns(getUserCampaigns());
  }, []);

  const handleCreateCampaign = () => {
    navigate('/create-campaign');
  };

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    setIsEditProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userData.avatar} alt={userData.fullName} />
                <AvatarFallback>{userData.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{userData.fullName}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
                <p className="text-sm text-muted-foreground">Member since {userData.memberSince}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      Update your filmmaker profile information and contact details.
                    </p>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={userData.fullName} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={userData.bio} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={userData.location} />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue={userData.website} />
                    </div>
                    <Button onClick={handleUpdateProfile} className="w-full">
                      Update Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={handleCreateCampaign}>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Bio</h3>
                  <p>{userData.bio}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Location</h3>
                    <p>{userData.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Website</h3>
                    <a 
                      href={`https://${userData.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {userData.website}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  My Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Show saved campaigns first */}
                  {userCampaigns.map((project) => (
                    <div key={project.title} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <Badge variant="secondary" className="mt-1">
                            Created
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            ${project.currentAmount?.toLocaleString() || '0'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            of ${project.goalAmount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.backers || 0} backers</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Then show mock projects */}
                  {userData.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <Badge 
                            variant={project.status === 'completed' ? 'default' : 'secondary'}
                            className="mt-1"
                          >
                            {project.status === 'completed' ? 'Completed' : 'Active'}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            ${project.raised.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            of ${project.goal.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.backers} backers</span>
                        </div>
                        {project.status === 'active' ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{project.daysLeft} days left</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Completed {project.completedDate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    ${userData.projects.reduce((total, project) => total + project.raised, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">
                      {userData.projects.reduce((total, project) => total + project.backers, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Backers</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{userData.projects.length}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Film className="mr-2 h-4 w-4" />
                  View My Campaigns
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payout History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Backer Messages
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}