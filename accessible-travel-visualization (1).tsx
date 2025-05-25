import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const AccessibleTravelViz = () => {
  const [activeTopicTab, setActiveTopicTab] = useState(0);
  const [activeComparisonTab, setActiveComparisonTab] = useState(0);
  
  // Data for main topics/clusters
  const topicClusters = [
    {
      id: 1,
      title: "Mobility and Mobility Aids",
      description: "Challenges around traveling with mobility devices like wheelchairs, walkers, scooters, and related equipment.",
      examples: [
        "Tips on handling and packing mobility devices",
        "Dealing with equipment damage or loss during travel",
        "Managing electric wheelchair batteries on flights",
        "Securing patient lifts and accessories"
      ]
    },
    {
      id: 2,
      title: "Transportation Accessibility",
      description: "Difficulties with various transportation methods and finding accessible options.",
      examples: [
        "Air travel security and boarding assistance",
        "Equipment handling during flights",
        "Accessible train and public transit options",
        "Vehicle rentals with hand controls"
      ]
    },
    {
      id: 3,
      title: "Destination and Accommodation Accessibility",
      description: "Challenges finding places with genuine accessibility beyond simple checkbox features.",
      examples: [
        "Detailed terrain information (cobblestones, sand, etc.)",
        "Step-free entries and internal accessibility",
        "Bathroom accessibility dimensions",
        "Bed height and transfer options"
      ]
    },
    {
      id: 4,
      title: "Planning, Preparation, and Resources",
      description: "The significant effort involved in researching and preparing for accessible travel.",
      examples: [
        "Finding reliable accessibility information",
        "Securing caregivers for travel",
        "Obtaining travel insurance for pre-existing conditions",
        "Packing medical supplies and backup equipment"
      ]
    },
    {
      id: 5,
      title: "Emotional and Social Aspects",
      description: "The psychological toll of travel and need for community support.",
      examples: [
        "Managing travel anxiety and exhaustion",
        "Dealing with sensory overload issues",
        "Feeling 'othered' or misunderstood",
        "Finding support for solo travel with disabilities"
      ]
    },
    {
      id: 6,
      title: "Advocacy and Awareness",
      description: "Highlighting systemic barriers and advocating for better accessibility.",
      examples: [
        "Addressing ableism encountered during travel",
        "Need for improved industry information",
        "Policy changes and consumer protections",
        "Sharing experiences to raise awareness"
      ]
    }
  ];

  // Data for the comparison radar chart
  const comparisonCategories = [
    {
      category: "Performance Expectancy (Usefulness)",
      ai: 2.5, // Based on document's assessment (scale 1-5)
      peer: 4.8,
      aiPoints: [
        "Can aggregate general information from websites and reviews",
        "Might provide lists of known accessible destinations",
        "Limited by availability and granularity of training data",
        "Struggles with verified, ground-level details"
      ],
      peerPoints: [
        "Provides highly specific, granular details from recent experiences",
        "Describes exact measurements and accessibility nuances",
        "Offers creative workarounds and 'hacks'",
        "Shares verified-by-experience information"
      ]
    },
    {
      category: "Effort Expectancy (Ease of Use)",
      ai: 3.8,
      peer: 2.7,
      aiPoints: [
        "Faster immediate response time",
        "Available 24/7 without waiting for replies",
        "Requires careful query formulation for useful results",
        "Extra effort needed to verify accuracy for critical needs"
      ],
      peerPoints: [
        "Requires posting and waiting for responses",
        "Time needed to sift through varied advice",
        "Can be emotionally taxing when facing ableist responses",
        "Thread structure helps follow relevant conversations"
      ]
    },
    {
      category: "Social Influence",
      ai: 1.5,
      peer: 4.9,
      aiPoints: [
        "Impersonal tool without social identity",
        "Lacks lived experience credential",
        "Cannot provide emotional validation",
        "Recommendations don't carry community trust"
      ],
      peerPoints: [
        "Advice carries weight due to shared lived experience",
        "Creates sense of community and validation",
        "Provides powerful encouragement seeing others succeed",
        "Recommendations influenced by trusted peer validation"
      ]
    },
    {
      category: "Facilitating Conditions",
      ai: 2.3,
      peer: 4.2,
      aiPoints: [
        "Heavily reliant on availability of structured data",
        "Limited by lack of comprehensive accessibility databases",
        "Requires technical literacy to use effectively",
        "Consistency can be helpful for basic information"
      ],
      peerPoints: [
        "Active communities willing to share specific information",
        "Can access information not formally documented",
        "Quality and quantity of responses varies",
        "Finding specific information can sometimes be difficult"
      ]
    },
    {
      category: "Hedonic Motivation",
      ai: 1.8,
      peer: 4.5,
      aiPoints: [
        "Primarily task-oriented interaction",
        "Lacks emotional depth for connection",
        "Efficiency might reduce planning stress",
        "Interaction itself not particularly enjoyable"
      ],
      peerPoints: [
        "Joy in connecting with others who understand",
        "Receiving empathetic support and validation",
        "Finding community through shared experiences",
        "Mutual aid creates positive emotional aspect"
      ]
    }
  ];

  // Data for the bar chart comparing strengths
  const strengthsComparison = [
    {
      name: 'Specificity & Nuance',
      ai: 2.0,
      peer: 4.8,
    },
    {
      name: 'Trusted Experience',
      ai: 1.5,
      peer: 4.9,
    },
    {
      name: 'Emotional Support',
      ai: 1.0,
      peer: 4.7,
    },
    {
      name: 'Dynamic Knowledge',
      ai: 2.2,
      peer: 4.5,
    },
    {
      name: 'Advocacy & Voice',
      ai: 1.4,
      peer: 4.8,
    },
    {
      name: 'Information Speed',
      ai: 4.8,
      peer: 2.5,
    },
    {
      name: 'Consistency',
      ai: 4.5,
      peer: 2.8,
    },
  ];

  // Custom tooltip for the radar chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded shadow-md max-w-xs">
          <p className="font-bold text-gray-800">{data.category}</p>
          <p className="text-blue-600">AI: {data.ai}/5</p>
          <p className="text-green-600">Peer Content: {data.peer}/5</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Accessible Travel Planning: AI vs. Peer Support</h1>
      
      {/* Main topics section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Main Topic Clusters in Accessible Travel Discussions</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-wrap">
            {topicClusters.map((topic, index) => (
              <div 
                key={topic.id}
                className={`cursor-pointer m-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTopicTab === index 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
                onClick={() => setActiveTopicTab(index)}
              >
                {topic.title}
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{topicClusters[activeTopicTab].title}</h3>
            <p className="text-gray-700 mb-4">{topicClusters[activeTopicTab].description}</p>
            <div className="mt-3">
              <h4 className="font-medium text-blue-700 mb-2">Common Examples:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {topicClusters[activeTopicTab].examples.map((example, i) => (
                  <li key={i} className="bg-white p-2 rounded border border-blue-100 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI vs Peer Content Comparison */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">AI vs. Peer Content Comparison</h2>
        
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Comparative Performance (UTAUT2 Framework)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={comparisonCategories}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#4B5563', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar name="AI Content" dataKey="ai" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                    <Radar name="Peer Content" dataKey="peer" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Comparison by Category</h3>
              <div className="flex mb-4 border-b border-gray-200">
                {comparisonCategories.map((item, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer py-2 px-4 font-medium text-sm ${
                      activeComparisonTab === index 
                        ? 'border-b-2 border-blue-600 text-blue-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveComparisonTab(index)}
                  >
                    {item.category.split(' ')[0]}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    AI Content ({comparisonCategories[activeComparisonTab].ai}/5)
                  </h4>
                  <ul className="space-y-2">
                    {comparisonCategories[activeComparisonTab].aiPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    Peer Content ({comparisonCategories[activeComparisonTab].peer}/5)
                  </h4>
                  <ul className="space-y-2">
                    {comparisonCategories[activeComparisonTab].peerPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Comparative Strengths</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={strengthsComparison}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="ai" name="AI Content" fill="#3B82F6" />
                <Bar dataKey="peer" name="Peer Content" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Key Findings */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Findings</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Strengths</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Quick aggregation of general accessibility information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Faster initial response with 24/7 availability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Consistent structure for basic research starting points</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Potential to compile and structure accessibility data</span>
                </li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Peer Content Strengths</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Highly specific, granular details from lived experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Trusted validation through shared understanding</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Crucial emotional support and community connection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Creative "hacks" and dynamic, informal solutions</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Conclusion</h3>
            <p className="text-gray-700">
              While AI has potential for compiling general information and providing initial research, peer-generated 
              content offers irreplaceable depth of specific detail, trusted lived experience, emotional support, 
              and a dynamic knowledge-sharing environment that is currently invaluable for accessible travel planning. 
              The optimal approach may be complementary, using AI for initial research and structured data while 
              relying on peer communities for the nuanced, empathetic, and highly specific guidance needed for 
              successful accessible travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleTravelViz;