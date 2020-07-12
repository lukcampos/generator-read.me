
export interface UploadResult {
  isImg: boolean
  name: string
  url: string
}
export interface Prerequisite {
  title: string;
  description?: string;
  enabled: Boolean;
  id: string;
}

export class Readme {
  projectTitle: string;
  projectDescription: string;

  gettingStarted: {
    description: string;
    prerequisites: Array<Prerequisite>
  }
  author: string;
}

export interface Fruit {
  name: string;
}
