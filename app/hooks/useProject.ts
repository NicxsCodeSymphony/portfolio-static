import { useState, useEffect } from 'react';
import {ProjectData} from '@/constant/FirebaseData';



export const useProjectData = () => {
    const [data, setData] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch('/api/project');
                
                if (!response.ok) {
                    setError(`Failed to fetch projects: ${response.status}`);
                    setLoading(false);
                    return;
                }

                const projectsData = await response.json();
                setData(projectsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { data, loading, error };
};

export const useProject = (projectId: string) => {
    const [project, setProject] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) {
                setError('Project ID is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/project/${projectId}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Project not found');
                    } else {
                        setError(`Failed to fetch project: ${response.status}`);
                    }
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred while fetching the project');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    return { project, loading, error };
};