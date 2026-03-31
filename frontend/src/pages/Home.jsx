import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import KnowledgeCard from '../components/features/KnowledgeCard';
import CreateModal from '../components/features/CreateModal';
import axios from 'axios';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issues, setIssues] = useState([]);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      fetchIssues(selectedRepo.owner.login, selectedRepo.name);
    }
  }, [selectedRepo]);

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`${API_URL}/repos`);
      setRepos(response.data);
      if (response.data && response.data.length > 0) {
        setSelectedRepo(response.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch repos", err);
      setError("Note: Please configure your backend with a valid GitHub PAT and restart the server.");
    }
  };

  const fetchIssues = async (owner, repoName) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/issues`, {
        params: {
          owner: owner,
          repo: repoName
        }
      });
      setIssues(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    } finally {
      setLoading(false);
    }
  };

  const dummyData = [
    { title: "Getting Started with React", description: "Learn the basics of React functional components.", category: "Frontend", author: "Admin" },
    { title: "FastAPI Routing Rules", description: "Best practices for defining API routes in FastAPI.", category: "Backend", author: "DevTeam" },
    { title: "Tailwind CSS Layouts", description: "Understanding flexbox and grid in Tailwind.", category: "Design", author: "UI Expert" },
    { title: "GitHub Actions CI/CD", description: "How to automate testing using GitHub flows.", category: "DevOps", author: "Admin" },
    { title: "Understanding React Hooks", description: "Deep dive into useState, useEffect, and custom hooks.", category: "Frontend", author: "DevTeam" },
    { title: "Dockerizing Python Apps", description: "A simple guide to dockerizing your FastAPI application.", category: "DevOps", author: "System" },
  ];

  const handleCreateSubmit = async (formData) => {
    if (!selectedRepo) {
      alert("No repository selected to create an issue.");
      return;
    }
    try {
      await axios.post(`${API_URL}/create-issue`, {
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        title: formData.title,
        body: formData.description,
        labels: [formData.category]
      });
      fetchIssues(selectedRepo.owner.login, selectedRepo.name);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating issue", error);
      alert("Failed to create issue. Have you set up the GitHub PAT correctly?");
      setIsModalOpen(false); 
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header onCreateClick={() => setIsModalOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-secondary">Knowledge Base</h1>
                <p className="text-gray-500 mt-1">Manage and access your team's knowledge articles via GitHub Issues.</p>
              </div>
              
              {repos.length > 0 && (
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Repository:</label>
                  <select 
                    className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={selectedRepo ? selectedRepo.id : ''}
                    onChange={(e) => {
                      const repo = repos.find(r => r.id === parseInt(e.target.value));
                      setSelectedRepo(repo);
                    }}
                  >
                    {repos.map(repo => (
                      <option key={repo.id} value={repo.id}>{repo.full_name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded mb-6 text-sm">
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.length > 0 
                ? issues.map((issue) => (
                    <KnowledgeCard 
                      key={issue.id}
                      title={issue.title}
                      description={issue.body || "No description provided."}
                      category={issue.labels?.[0]?.name || "Uncategorized"}
                      url={issue.html_url}
                    />
                  ))
                : dummyData.map((item, index) => (
                    <KnowledgeCard 
                      key={index}
                      title={item.title}
                      description={item.description}
                      category={item.category}
                      author={item.author}
                    />
                  ))
              }
            </div>
          </div>
        </main>
      </div>

      <CreateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
};

export default Home;
