import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import {
  Play,
  Shield,
  Star,
  TrendingUp,
  Film,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { campaigns } from "@/data/campaigns";
import { MilestoneStatusBar } from "@/components/MilestoneStatusBar";

const Index = () => {
  // Get saved campaigns from localStorage
  const savedCampaigns = JSON.parse(localStorage.getItem('allCampaigns') || '[]');
  const allCampaigns = [...campaigns, ...savedCampaigns];

  // Scroll animation hooks
  const heroTextRef = useScrollAnimation(0.2);
  const heroSubTextRef = useScrollAnimation(0.2);
  const statsRef = useScrollAnimation(0.3);
  const stats = [
    { label: "Active Campaigns", value: "127", change: "+12%", icon: Film },
    { label: "Filmmakers Funded", value: "2,340", change: "+18%", icon: Users },
    { label: "Total Raised", value: "$4.2M", change: "+25%", icon: DollarSign },
    {
      label: "Success Rate",
      value: "78%",
      change: "Industry leading",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              Milestone-Based Film Funding
            </Badge>
          </div>
          <h1 
            ref={heroTextRef as any}
            className="scroll-typewriter text-5xl md:text-6xl font-bold italic mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Fund Independent Films{" "}
            <span className="block">One Milestone at a Time</span>
          </h1>
          <p 
            ref={heroSubTextRef as any}
            className="scroll-typewriter typewriter-delay-1 text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed italic"
          >
            Homegrown connects indie filmmakers with investors through
            structured, milestone-based funding. Build trust, reduce risk, and
            help stories rise with proof-first financing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 font-crimson italic font-bold">
              <Play className="mr-2 h-5 w-5" />
              Browse Campaigns
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 font-crimson italic font-bold"
              asChild
            >
              <Link to="/profile">Start Your Campaign</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Funds in Escrow</h3>
                <p className="text-muted-foreground">
                  Secure milestone-based releases protect both filmmakers and
                  investors
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Proof-First Funding
                </h3>
                <p className="text-muted-foreground">
                  Deliverables verified before each funding milestone is
                  released
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Film className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Genre Templates</h3>
                <p className="text-muted-foreground">
                  Structured funding plans tailored to different film genres
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 
              ref={statsRef as any}
              className="scroll-typewriter text-3xl font-bold mb-4 italic font-crimson"
            >
              Empowering Independent Cinema
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 italic font-crimson">Featured Campaigns</h2>
              <p className="text-muted-foreground italic font-crimson">
                Discover stories worth investing in
              </p>
            </div>
            <Button variant="outline">View All Campaigns</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{campaign.genre}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {campaign.status ? campaign.status.replace("-", " ") : "Active"}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {campaign.shortDescription}
                  </p>

                  <div className="text-sm text-muted-foreground mb-3">
                    {campaign.location}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>{campaign.daysLeft} days left</span>
                      <span>
                        {Math.round(
                          (campaign.currentAmount / campaign.goalAmount) * 100,
                        )}
                        % funded
                      </span>
                    </div>

                    <Progress
                      value={
                        (campaign.currentAmount / campaign.goalAmount) * 100
                      }
                      className="h-2"
                    />

                    {/* Add milestone indicators if campaign has milestones */}
                    {campaign.milestones && (
                      <div className="mt-3">
                        <MilestoneStatusBar 
                          milestones={campaign.milestones}
                          currentAmount={campaign.currentAmount}
                          goalAmount={campaign.goalAmount}
                          showLabels={false}
                        />
                      </div>
                    )}

                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold text-primary">
                          ${campaign.currentAmount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          of ${campaign.goalAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {campaign.backers} backers
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/campaign/${campaign.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">How Homegrown Works</h2>
          <p className="text-muted-foreground mb-12">
            A structured approach to film funding that builds trust between
            creators and investors
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                For Filmmakers
              </h3>
              <div className="space-y-6 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Campaign</h4>
                    <p className="text-sm text-muted-foreground">
                      Define your film, budget, and select genre-specific
                      milestones
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Reach Milestones</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete deliverables to unlock funding at each stage
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Your Film</h4>
                    <p className="text-sm text-muted-foreground">
                      Bring your vision to life with transparent,
                      milestone-based funding
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">
                For Investors
              </h3>
              <div className="space-y-6 text-left">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Browse Projects</h4>
                    <p className="text-sm text-muted-foreground">
                      Discover films by genre, location, and filmmaker
                      experience
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Invest Safely</h4>
                    <p className="text-sm text-muted-foreground">
                      Funds held in escrow, released only when milestones are
                      met
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Support Art</h4>
                    <p className="text-sm text-muted-foreground">
                      Help independent stories reach audiences worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
