export interface SignUpFormData {
    name: string;
    email: string;
    password: string;
};

export interface CardProps{
    id?:string;
    title?:string;
    showDoneTasks?:boolean;
    tasks?:(TaskProps | CountingTaskProps)[];
  };

  export interface TaskProps {
    id: string;
    title: string;
    body: string;
    type: 'normal';
    done: boolean;
    onDelete: (taskId: string) => void;
  };

  export interface CountingTaskProps {
    id: string;
    title: string;
    targetCount: number;
    currentCount: number;
    type:'counting';
    done:boolean;
    onIncrement: () => void;
    onDelete: () => void;
    onTargetCountChange: (newTargetCount: number) => void;
  }

export interface User {
    id: string;
    username: string;
}
