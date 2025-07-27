import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface MilestoneStatusBarProps {
  currentAmount: number;
  goalAmount: number;
  milestones: Array<{
    id: string;
    title: string;
    amount: number;
    completed: boolean;
  }>;
  showLabels?: boolean;
}

export const MilestoneStatusBar = ({ 
  currentAmount, 
  goalAmount, 
  milestones,
  showLabels = true 
}: MilestoneStatusBarProps) => {
  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="space-y-4">
      {showLabels && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Funding Milestones</h3>
          <span className="text-sm text-muted-foreground">
            ${currentAmount.toLocaleString()} / ${goalAmount.toLocaleString()}
          </span>
        </div>
      )}
      
      <div className="relative">
        <div className={`${showLabels ? 'h-2' : 'h-1'} bg-muted rounded-full overflow-hidden`}>
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Milestone markers */}
        <div className="relative mt-2">
          {milestones.map((milestone) => {
            const milestonePosition = (milestone.amount / goalAmount) * 100;
            const isReached = currentAmount >= milestone.amount;
            
            return (
              <div
                key={milestone.id}
                className="absolute transform -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${milestonePosition}%` }}
              >
                <div 
                  className={cn(
                    `${showLabels ? 'w-4 h-4' : 'w-2 h-2'} rounded-full border-2 flex items-center justify-center transition-all duration-200`,
                    {
                      'bg-primary border-primary text-primary-foreground': isReached,
                      'bg-background border-muted-foreground': !isReached
                    }
                  )}
                >
                  {isReached && showLabels && <Check className="w-2 h-2" />}
                </div>
                {showLabels && (
                  <div className="mt-1 text-xs text-center">
                    <div className="font-medium">${milestone.amount.toLocaleString()}</div>
                    <div className="text-muted-foreground max-w-16 truncate">
                      {milestone.title}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};