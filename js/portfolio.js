// Main application logic
class Portfolio {
  constructor() {
    this.experiences = [];
    this.projects = [];
    this.visibleProjects = 1; // Start with showing only 1 project
    this.projectsPerLoad = 1; // Load 1 more project each time
  }

  async init() {
    try {
      await this.loadData();
      this.renderExperiences();
      this.renderProjects();
      console.log('Portfolio initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio:', error);
      // Only show error if fallback data also fails
      this.showError('Failed to load portfolio data. Please try again later.');
    }
  }

  async loadData() {
    try {
      // Try to load JSON files
      const [experiencesResponse, projectsResponse] = await Promise.all([
        fetch('./data/experiences.json'),
        fetch('./data/projects.json')
      ]);

      if (!experiencesResponse.ok || !projectsResponse.ok) {
        throw new Error(`HTTP error! Experiences: ${experiencesResponse.status}, Projects: ${projectsResponse.status}`);
      }

      this.experiences = await experiencesResponse.json();
      this.projects = await projectsResponse.json();
      
      console.log('Data loaded successfully:', { 
        experiences: this.experiences.length, 
        projects: this.projects.length 
      });
      
    } catch (error) {
      console.error('Error loading JSON files:', error);
      console.log('Using fallback data due to CORS restrictions or missing files');
      
      // Fallback data
      this.loadFallbackData();
    }
  }

  loadFallbackData() {
    this.experiences = [
      {
        "id": "microsoft",
        "company": "Microsoft Corporation",
        "logo": "./images/msft.png",
        "type": "work",
        "positions": [
          {
            "id": "microsoft-2024",
            "date": "July 2024 - Present",
            "role": "Software Engineer",
            "description": "As a Software Engineer at Microsoft, I contribute to performance and reliability improvements in container networking, with a focus on technologies like Cilium, HNS, and Host Compute Network (HCN) APIs. My work includes debugging complex networking issues, integrating telemetry, and automating test infrastructure across Windows Server environments. I collaborate cross-functionally to support performance validation, troubleshoot internal tooling, and drive experimentation initiatives. My experience spans scripting, system-level diagnostics, and contributing to scalable, production-grade infrastructure."
          },
          {
            "id": "microsoft-2023",
            "date": "Summer 2023",
            "role": "Software Engineering Intern",
            "description": "Conducted technical research on relevant factors affecting the performance of HTTP/3 (MSQUIC) servers. Built a performance reporting tool that collects load time and CPU usage data on HTTP/3 (MSQUIC) test websites. Utilized Linux's netem to add latency and packet loss to network traffic to simulate real-world network conditions throughout the tests."
          },
          {
            "id": "microsoft-2022",
            "date": "Summer 2022",
            "role": "Explorer Intern",
            "description": "I built a pipeline that uses a querying interface to extract >1TiB IoT Hub Device data from Azure Cloud. I also performed statistical analysis on >60% of IoT Hub Devices and visually represented the results using PowerBi. In addition, I successfully completed a hands-on Cloud Development Boot Camp focused on implementing reliable applications for the cloud."
          }
        ]
      },
      {
        "id": "swarthmore",
        "company": "Swarthmore College",
        "logo": "./images/swat.jpeg",
        "type": "education",
        "positions": [
          {
            "id": "swarthmore-degree",
            "date": "Aug 2020 - May 2024",
            "role": "BA, Computer Science and Economics",
            "description": "I was a student at Swarthmore College, PA where I was a double major in Computer Science and Economics. My relevant coursework included Advanced Algorithms, Artificial Intelligence, Compilers, Introduction to Computer Systems, Introduction to Data Structures and Algorithms, Discrete Mathematics, Linear Algebra, Statistical Methods, and Econometrics."
          }
        ]
      }
    ];

    this.projects = [
      {
        "id": "graph-coloring",
        "date": "2023",
        "title": "Graph Coloring",
        "description": "This project involved the implementation of three Local Search Algorithms: Hill Climbing, Simulated Annealing, and Stochastic Beam Search. These algorithms were used to solve the NP-Complete Problem of Graph Coloring in Computer Science. The goal of this problem is to color the vertices of a graph such that no two adjacent vertices share the same color while minimizing the number of colors used. I conducted several experiments on these algorithms to compare their performance in solving any Graph Coloring Problem by varying different parameters.",
        "github": "https://github.com/ndufitimana/GraphColoring"
      },
      {
        "id": "bookmark-api",
        "date": "2023",
        "title": "Bookmark REST API",
        "description": "Built a REST API that implements a bookmark feature with the following endpoints using Flask: `/users/int:id`, `/users`, `/bookmark`, `/bookmarks`, `/bookmark/int:bookmark_id`, and `/tokens`. The `/tokens` endpoint allows users to request a new token or revoke their current token. This feature is implemented using Flask-HTTPAuth to protect certain endpoints with tokens in order to restrict certain behaviors only to authorized users. The remaining endpoints serve to retrieve and create information about users, and bookmarks. Data related to users and bookmarks is stored using a SQLite database created with Flask-SQLAlchemy.",
        "github": "https://github.com/ndufitimana/Bookmark_REST_API"
      },
      {
        "id": "asl-cnn",
        "date": "2022",
        "title": "ASL CNN",
        "description": "Built and Trained a Convolutional Neural Network using Tensorflow and Keras. The goal of CNN was to recognize the American Sign Language (ASL) Alphabet. To train and test the model, I used the ASL Alphabet dataset from Kaggle, which can be accessed at this link: https://www.kaggle.com/datasets/grassknoted/asl-alphabet. The CNN achieved an accuracy of **98.38%** on the test set.",
        "github": "https://github.com/ndufitimana/ASL_CNN"
      },
      {
        "id": "connect4-ai",
        "date": "2022",
        "title": "MCTS and MiniMax on Connect-4",
        "description": "A project involving the implementation of two adversarial search algorithms: Monte Carlo Tree Search(MCTS) and Minimax Algorithms. These algorithms were used to play the Connect-4 Game on the terminal. I implemented a Connect-4 game version that uses the terminal. I ran several experiments on these algorithms to compare their performance using different parameters. Specifically, I varied the number of rollouts for MCTS and the search depth for Minimax.",
        "github": "https://github.com/ndufitimana/Connect_4"
      }
    ];
  }

  renderExperiences() {
    const timelineContainer = document.querySelector('#experiences-timeline');
    if (!timelineContainer) {
      console.error('Experiences timeline container not found');
      return;
    }

    timelineContainer.innerHTML = '';

    this.experiences.forEach(experience => {
      const timelineItem = this.createExperienceItem(experience);
      timelineContainer.appendChild(timelineItem);
    });
  }

  renderProjects() {
    const timelineContainer = document.querySelector('#projects-timeline');
    if (!timelineContainer) {
      console.error('Projects timeline container not found');
      return;
    }

    timelineContainer.innerHTML = '';

    // Show only the visible projects
    const projectsToShow = this.projects.slice(0, this.visibleProjects);
    
    projectsToShow.forEach(project => {
      const timelineItem = this.createProjectItem(project);
      timelineContainer.appendChild(timelineItem);
    });

    // Add "View More" button if there are more projects to show
    if (this.visibleProjects < this.projects.length) {
      const viewMoreButton = this.createViewMoreButton();
      timelineContainer.appendChild(viewMoreButton);
    }
  }

  createViewMoreButton() {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'view-more-container';
    
    const button = document.createElement('button');
    button.className = 'view-more-btn';
    button.textContent = 'See More';
    
    button.addEventListener('click', () => {
      this.loadMoreProjects();
    });
    
    buttonContainer.appendChild(button);
    return buttonContainer;
  }

  loadMoreProjects() {
    this.visibleProjects += this.projectsPerLoad;
    
    // Re-render projects with the new count
    this.renderProjects();
    
    // Smooth scroll to the newly revealed project
    setTimeout(() => {
      const newProject = document.querySelector(`[data-id="${this.projects[this.visibleProjects - 1].id}"]`);
      if (newProject) {
        newProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  createExperienceItem(experience) {
    const item = document.createElement('div');
    item.className = 'timeline-item company-group';
    item.setAttribute('data-id', experience.id);

    const logoHtml = experience.logo ? 
      `<div class="company-logo">
        <img src="${experience.logo}" alt="${experience.company}">
      </div>` : '';

    // Create positions HTML
    const positionsHtml = experience.positions.map(position => `
      <div class="position-item">
        <div class="position-date">${position.date}</div>
        <div class="position-content">
          <h4 class="position-role">${position.role}</h4>
          <p class="position-description">${position.description}</p>
        </div>
      </div>
    `).join('');

    item.innerHTML = `
      <div class="timeline-content">
        ${logoHtml}
        <div class="timeline-text">
          <h3 class="company-name">${experience.company}</h3>
          <div class="positions-timeline">
            ${positionsHtml}
          </div>
        </div>
      </div>
    `;

    return item;
  }

  createProjectItem(project) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('data-id', project.id);

    const githubLink = project.github ? 
      `<a href="${project.github}" class="project-link">View on GitHub</a>` : '';

    // Process description to handle markdown-like formatting
    const processedDescription = this.processDescription(project.description);

    item.innerHTML = `
      <div class="timeline-date">${project.date}</div>
      <div class="timeline-content">
        <div class="timeline-text">
          <h3>${project.title}</h3>
          <p>${processedDescription}</p>
          ${githubLink}
        </div>
      </div>
    `;

    return item;
  }

  processDescription(description) {
    // Convert **text** to <strong>text</strong>
    let processed = description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert `code` to <code>code</code>
    processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert URLs to links
    processed = processed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    
    return processed;
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
      background-color: #fee;
      border: 1px solid #fcc;
      color: #c33;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 4px;
      text-align: center;
    `;
    errorDiv.textContent = message;

    const container = document.querySelector('.container');
    if (container) {
      container.insertBefore(errorDiv, container.firstChild);
    }
  }
}

// Initialize the portfolio when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio();
  portfolio.init();
});

// Export for potential future use
window.Portfolio = Portfolio;
