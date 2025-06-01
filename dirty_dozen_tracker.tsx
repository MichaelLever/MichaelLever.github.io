import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Award, Target, Download, Upload } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DirtyDozenTracker = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Sustaining travel dreams in retirement: Guidance at the crossroads",
      publication: "Connected Autonomy book",
      coAuthors: "Michael S. Mulvey, Dan Padgett",
      currentStage: 1,
      notes: ""
    },
    {
      id: 2,
      title: "Show me a Story: Social Media-Based User-Generated Videos and Destination Brand Engagement",
      publication: "Global Perspectives on Strategic Storytelling in Destination Marketing",
      coAuthors: "Statia Elliot",
      currentStage: 5,
      notes: "JSR"
    },
    {
      id: 3,
      title: "How can students manage COVID-impacted turnover within Fairmont Banff Springs?",
      publication: "Case-based research in tourism, travel, hospitality and events: Rethinking theory and practice",
      coAuthors: "None (solo author)",
      currentStage: 4,
      notes: "TTRA 2017"
    },
    {
      id: 4,
      title: "Pride and Promotion: Exploring Relationships Between National Identification, Destination Advocacy, Tourism Ethnocentrism and Destination Image",
      publication: "Journal of Vacation Marketing",
      coAuthors: "Statia Elliot, Marion Joppe",
      currentStage: 4,
      notes: "SMA 2019"
    },
    {
      id: 5,
      title: "Tripping over Invisible Borders: Variability in Travel Sentiments by Distance from Home",
      publication: "Tourism Review",
      coAuthors: "Michael S. Mulvey, Statia Elliot",
      currentStage: 4,
      notes: "Thinking Visually 2021"
    }
  ]);



  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const exportData = () => {
    const data = {
      projects,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dirty-dozen-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
          alert('Data imported successfully!');
        } else {
          alert('Invalid file format. Please select a valid tracker export file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  const stages = [
    { id: 1, name: "Idea", description: "Initial concept development" },
    { id: 2, name: "Outlined, with data", description: "Research plan and data collection" },
    { id: 3, name: "Completed draft", description: "First complete manuscript" },
    { id: 4, name: "Presented at conference", description: "Conference presentation completed" },
    { id: 5, name: "Journal review", description: "Submitted for peer review" },
    { id: 6, name: "Revise and resubmit", description: "Addressing reviewer feedback" },
    { id: 7, name: "Under post-R&R review", description: "Second round of review" },
    { id: 8, name: "Accepted!", description: "Ready for publication" }
  ];

  const getTotalPoints = () => {
    return projects.reduce((total, project) => total + project.currentStage, 0);
  };

  const getStageDistribution = () => {
    const distribution = stages.map(stage => ({
      stage: stage.id,
      name: stage.name,
      count: projects.filter(project => project.currentStage === stage.id).length
    }));
    return distribution;
  };

  const getProgressLevel = () => {
    const points = getTotalPoints();
    if (points >= 80) return { level: "Research Master", color: "text-purple-600" };
    if (points >= 60) return { level: "Senior Researcher", color: "text-blue-600" };
    if (points >= 40) return { level: "Active Researcher", color: "text-green-600" };
    if (points >= 20) return { level: "Emerging Researcher", color: "text-yellow-600" };
    return { level: "Getting Started", color: "text-gray-600" };
  };

  const updateProjectStage = (projectId, newStage) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, currentStage: Math.max(1, Math.min(8, newStage)) }
        : project
    ));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Research Project",
      publication: "Target Journal",
      coAuthors: "",
      currentStage: 1,
      notes: ""
    };
    setProjects([...projects, newProject]);
    setEditingProject(newProject.id);
    setShowAddForm(false);
  };

  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const updateProject = (projectId, updates) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
  };

  const progressLevel = getProgressLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                The Dirty Dozen Big Board
              </h1>
              <p className="text-gray-600">No more than a dozen papers until one is accepted!</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Save/Load Controls */}
              <div className="flex gap-2">
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  title="Export your data"
                >
                  <Download size={16} />
                  Export
                </button>
                <label className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm cursor-pointer">
                  <Upload size={16} />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
              </div>
              
              {/* Progress Stats */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-yellow-500" size={24} />
                  <span className={`text-2xl font-bold ${progressLevel.color}`}>
                    {getTotalPoints()} Points
                  </span>
                </div>
                <p className={`${progressLevel.color} font-semibold`}>
                  {progressLevel.level}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Legend */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="text-blue-500" size={20} />
            Research Stages
          </h2>
          
          {/* Horizontal Stage Flow */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-between gap-4">
              {stages.map((stage, index) => (
                <div key={stage.id} className="flex-1 min-w-[120px] text-center">
                  <div className="flex flex-col items-center">
                    {/* Stage Number */}
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full text-lg flex items-center justify-center font-bold mb-2">
                      {stage.id}
                    </div>
                    
                    {/* Stage Name */}
                    <div className="font-medium text-sm mb-1 leading-tight">
                      {stage.name}
                    </div>
                    
                    {/* Stage Description */}
                    <div className="text-xs text-gray-500 leading-relaxed">
                      {stage.description}
                    </div>
                    
                    {/* Project Count */}
                    <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {projects.filter(project => project.currentStage === stage.id).length} projects
                    </div>
                  </div>
                  
                  {/* Arrow (except for last stage) */}
                  {index < stages.length - 1 && (
                    <div className="hidden lg:flex justify-center mt-4">
                      <div className="text-gray-400 text-2xl">→</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Projects */}
        <div className="space-y-4 mb-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              {editingProject === project.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    className="w-full text-lg font-semibold border-b-2 border-blue-300 focus:border-blue-500 outline-none bg-transparent"
                    placeholder="Project Title"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={project.publication}
                      onChange={(e) => updateProject(project.id, { publication: e.target.value })}
                      className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
                      placeholder="Target Publication"
                    />
                    <input
                      type="text"
                      value={project.coAuthors}
                      onChange={(e) => updateProject(project.id, { coAuthors: e.target.value })}
                      className="border rounded p-2 focus:ring-2 focus:ring-blue-300"
                      placeholder="Co-authors"
                    />
                  </div>
                  <input
                    type="text"
                    value={project.notes}
                    onChange={(e) => updateProject(project.id, { notes: e.target.value })}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-300"
                    placeholder="Notes (conference, journal, etc.)"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 italic mb-1">
                        {project.publication}
                      </p>
                      <p className="text-sm text-gray-500">
                        {project.coAuthors}
                      </p>
                      {project.notes && (
                        <p className="text-sm text-blue-600 mt-1">
                          {project.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setEditingProject(project.id)}
                        className="p-2 text-gray-500 hover:text-blue-500"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Stage {project.currentStage}: {stages[project.currentStage - 1].name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {project.currentStage}/8 points
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {stages.map(stage => (
                        <div
                          key={stage.id}
                          className={`flex-1 h-3 rounded cursor-pointer transition-colors ${
                            stage.id <= project.currentStage
                              ? 'bg-blue-500 hover:bg-blue-600'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                          onClick={() => updateProjectStage(project.id, stage.id)}
                          title={`${stage.name}: ${stage.description}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stage Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateProjectStage(project.id, project.currentStage - 1)}
                      disabled={project.currentStage <= 1}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => updateProjectStage(project.id, project.currentStage + 1)}
                      disabled={project.currentStage >= 8}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Project Button */}
        <div className="text-center mb-6">
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
          >
            <Plus size={20} />
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirtyDozenTracker;