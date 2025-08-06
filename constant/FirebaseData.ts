export interface Awards{
    award: string;
    image: string;
    url: string;
}

export interface Hero{
    subtitle: string;
    title: string;
    cv: string;
    image: string;
}

export interface About{
    title: string;
    subtitle1: string;
    subtitle2: string;
}

export interface PersonalInfo{
    name: string;
    position: string;
    email: string;
    contact: string;
    address: string;
    status: string;
    website: string;
    client_count: string;
    years_experience: string;
    project_count: string;
    companies: string;
    image1: string;
    image2: string;
    image3: string;
}

export interface Services{
    title: string;
    image: string;
    description: string;
    link: string;
}

export interface ProjectData {
    uid: string;
    title: string;
    subtitle: string;
    role: string;
    client: string;
    description: string;
    thumbnail: string;
    project_url: string;
    github_url: string;
    images: string[];
    tech: string[];
    type: string[]
    featured: string;
    start_date: string;
    end_date: string;
}