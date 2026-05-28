import mongoose from 'mongoose';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Certification from '../models/Certification.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Trigger Database Seeding
    await seedDatabase();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // 1. Seed Admin User
    const adminCount = await User.countDocuments();
    const defaultUser = process.env.DEFAULT_ADMIN_USER || 'admin';
    const defaultPass = process.env.DEFAULT_ADMIN_PASS || 'MukeshCyber2026!';
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'mukesh631701@gmail.com';

    if (adminCount === 0) {
      await User.create({
        username: defaultUser,
        password: defaultPass,
        email: defaultEmail
      });
      console.log('Seeded Admin account successfully!');
      console.log(`Username: ${defaultUser}`);
      console.log(`Password: ${defaultPass}`);
    } else {
      await User.updateOne({ username: defaultUser }, { email: defaultEmail });
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const initialProjects = [
        {
          title: "AI-ML Integrated Healthcare Risk Management System",
          description: "An advanced, intelligent healthcare risk prediction and report analyzer system featuring Gemini AI and custom ML classification.",
          longDescription: "Developed a comprehensive full-stack medical utility that evaluates patient risk profiles using a Random Forest classification model boasting 93% accuracy. Features full Gemini AI integration to interpret complex medical report PDFs, an empathetic real-time AI conversational chatbot, and a robust PostgreSQL calendar appointment scheduling framework.",
          techStack: ["React.js", "Flask", "PostgreSQL", "Random Forest", "PyPDF", "Gemini AI"],
          githubLink: "https://github.com/MUKESHV17",
          liveLink: "",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
          isFeatured: true,
          order: 1
        },
        {
          title: "E-Wallet Management System",
          description: "A highly secure digital transaction ledger and electronic wallet system powered by Spring Boot microservices.",
          longDescription: "Engineered a secure financial portal implementing role-based access control, secure JWT-validated authorization, real-time fund transfers, transaction histories, and balance sheets. Structured with a React.js dashboard interface communicating with a Spring Boot enterprise Java backend and a MySQL relational database.",
          techStack: ["React.js", "Spring Boot", "MySQL", "JWT", "REST APIs"],
          githubLink: "https://github.com/MUKESHV17",
          liveLink: "",
          image: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=800&q=80",
          isFeatured: true,
          order: 2
        },
        {
          title: "Intelligent Traffic Management System",
          description: "Computer Vision driven traffic flow optimizer simulating dynamic smart junction scheduling based on real-time density.",
          longDescription: "Constructed an autonomous traffic flow optimizer utilizing YOLO object detection to classify vehicle types and calculate queue density on multi-junction lanes. Deployed custom TensorFlow scripts that feed real-time density metrics to a dynamic signal switching algorithm, reducing congestion and junction wait times by 23% in Pygame simulated environments.",
          techStack: ["Python", "TensorFlow", "YOLOv8", "Pygame", "OpenCV"],
          githubLink: "https://github.com/MUKESHV17",
          liveLink: "",
          image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
          isFeatured: true,
          order: 3
        }
      ];
      await Project.create(initialProjects);
      console.log('Seeded Initial Projects successfully!');
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const initialSkills = [
        // Languages
        { name: "C++", category: "Languages", level: "Advanced", order: 1 },
        { name: "Java", category: "Languages", level: "Intermediate", order: 2 },
        { name: "Python", category: "Languages", level: "Advanced", order: 3 },
        { name: "JavaScript", category: "Languages", level: "Intermediate", order: 4 },
        // Frontend
        { name: "React.js", category: "Frontend", level: "Intermediate", order: 1 },
        { name: "HTML5", category: "Frontend", level: "Advanced", order: 2 },
        { name: "CSS3", category: "Frontend", level: "Advanced", order: 3 },
        { name: "Tailwind CSS", category: "Frontend", level: "Advanced", order: 4 },
        // Backend
        { name: "Node.js", category: "Backend", level: "Intermediate", order: 1 },
        { name: "Express.js", category: "Backend", level: "Intermediate", order: 2 },
        { name: "Flask", category: "Backend", level: "Intermediate", order: 3 },
        { name: "Spring Boot", category: "Backend", level: "Intermediate", order: 4 },
        // Databases
        { name: "MongoDB", category: "Databases", level: "Intermediate", order: 1 },
        { name: "PostgreSQL", category: "Databases", level: "Intermediate", order: 2 },
        { name: "MySQL", category: "Databases", level: "Intermediate", order: 3 },
        // AI/ML
        { name: "TensorFlow", category: "AI/ML", level: "Intermediate", order: 1 },
        { name: "PyTorch", category: "AI/ML", level: "Intermediate", order: 2 },
        { name: "YOLO (v8)", category: "AI/ML", level: "Advanced", order: 3 },
        { name: "Scikit-learn", category: "AI/ML", level: "Advanced", order: 4 },
        // Other
        { name: "REST APIs", category: "Other", level: "Advanced", order: 1 },
        { name: "JWT", category: "Other", level: "Advanced", order: 2 },
        { name: "Git", category: "Other", level: "Advanced", order: 3 },
        { name: "GitHub", category: "Other", level: "Advanced", order: 4 }
      ];
      await Skill.create(initialSkills);
      console.log('Seeded Initial Skills successfully!');
    }

    // 4. Seed Experiences
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      const initialExperience = [
        {
          role: "Computer Vision Intern",
          company: "Octanet Services Pvt. Ltd.",
          duration: "Oct 2025 - Nov 2025",
          description: [
            "Developed a real-time object detection and multi-object tracking pipeline utilizing YOLOv8 and ResNet-50 models.",
            "Built a centralized administrative dashboard using React.js and a Flask RESTful API to present video analytics streams.",
            "Optimized tracking stabilization parameters and detection confidence limits, enhancing tracking stability under occlusions."
          ],
          order: 1
        }
      ];
      await Experience.create(initialExperience);
      console.log('Seeded Initial Experiences successfully!');
    }

    // 5. Seed Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      const initialCerts = [
        {
          name: "AWS Cloud Practitioner Essentials",
          issuer: "Amazon Web Services (AWS)",
          date: "2025",
          credentialId: "AWS-CPE-12345",
          credentialUrl: "https://drive.google.com/file/d/182EOSjmb-GtHq0I_49OsBOtKUyEdR7Lw/view?usp=sharing"
        },
        {
          name: "Google Cloud Computing Foundations",
          issuer: "Google Cloud",
          date: "2025",
          credentialId: "GCP-GCCF-67890",
          credentialUrl: "https://drive.google.com/file/d/1biAMI-YzNx1hlp80KdWibeKUcJ0r8fYU/view?usp=sharing"
        },
        {
          name: "Cisco Networking Basics",
          issuer: "Cisco Networking Academy",
          date: "2024",
          credentialId: "CISCO-NET-98765",
          credentialUrl: "https://drive.google.com/file/d/1A-d_E5AxcSzUty0lt82kZ7J-Mx_k7AzC/view?usp=sharing"
        },
        {
          name: "Cybersecurity Essentials",
          issuer: "Cisco Networking Academy",
          date: "2024",
          credentialId: "CISCO-CYBER-54321",
          credentialUrl: "https://drive.google.com/file/d/12IBWxBHU-Ay0KQ4ixW60BUHv9pyCM-2/view?usp=sharing"
        }
      ];
      await Certification.create(initialCerts);
      console.log('Seeded Initial Certifications successfully!');
    } else {
      await Certification.updateOne({ name: "AWS Cloud Practitioner Essentials" }, { credentialUrl: "https://drive.google.com/file/d/182EOSjmb-GtHq0I_49OsBOtKUyEdR7Lw/view?usp=sharing" });
      await Certification.updateOne({ name: "Google Cloud Computing Foundations" }, { credentialUrl: "https://drive.google.com/file/d/1biAMI-YzNx1hlp80KdWibeKUcJ0r8fYU/view?usp=sharing" });
      await Certification.updateOne({ name: "Cisco Networking Basics" }, { credentialUrl: "https://drive.google.com/file/d/1A-d_E5AxcSzUty0lt82kZ7J-Mx_k7AzC/view?usp=sharing" });
      await Certification.updateOne({ name: "Cybersecurity Essentials" }, { credentialUrl: "https://drive.google.com/file/d/12IBWxBHU-Ay0KQ4ixW60BUHv9pyCM-2/view?usp=sharing" });
    }

  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
  }
};

export default connectDB;
