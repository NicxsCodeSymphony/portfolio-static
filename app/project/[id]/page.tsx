import React from 'react';
import { notFound } from 'next/navigation';
import ProjectPageClient from '../ProjectClient';

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function getProject(id: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/project/${id}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const project = await response.json();
        
        // Transform the data to ensure it matches our interface
        const transformedProject = {
            ...project,
            // Ensure tech is always an array
            tech: Array.isArray(project.tech) 
                ? project.tech 
                : project.tech && typeof project.tech === 'object'
                ? Object.values(project.tech)
                : [],
            // Ensure images is always an array
            images: Array.isArray(project.images) 
                ? project.images 
                : project.images && typeof project.images === 'object'
                ? Object.values(project.images)
                : [],
            // Ensure other required fields have fallbacks
            title: project.title || 'Project Title',
            subtitle: project.subtitle || 'Project Subtitle',
            description: project.description || 'No description available.',
            client: project.client || 'N/A',
            role: project.role || 'N/A',
            start_date: project.start_date || 'N/A',
            end_date: project.end_date || 'N/A',
            thumbnail: project.thumbnail || '/sample.jpg',
            project_url: project.project_url || '',
            github_url: project.github_url || '',
            featured: project.featured || 'false'
        };
        
        return transformedProject;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return <ProjectPageClient project={project} />;
} 