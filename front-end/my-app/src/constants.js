const internetIPAddress = "http://192.168.1.39:8000/"

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};

export const CODE_SNIPPETS = {
  javascript:
    'function solution() {\n\t\n}\n\nsolution();',
  python:
  'def solution():\n\t\n\nsolution();',
  java: 'public class Solution {\n\tpublic static void main(String[] args) {\n\t\t\n\t}\n}\n',
};

const year1n2 = {
  header: "YEARS 1 AND 2",
  description:
    "You follow years 1 and 2 of the KMITL programme: BEng Software Engineering (International Programme)",
  coreCourses: [],
};

const year3 = {
  header: "YEAR 3",
  description: "Core courses:",
  coreCourses: [
    "ALGORITHMICS I",
    "DATA FUNDAMENTALS",
    "HUMAN-CENTRED SYSTEMS DESIGN AND EVALUATION",
    "SYSTEMS PROGRAMMING",
    "PROFESSIONAL SOFTWARE DEVELOPMENT",
    "TEAM PROJECT",
    "SOFTWARE ENGINEERING SUMMER PLACEMENT",
  ],
};

const year4 = {
  header: "YEAR 4",
  description: "Core courses:",
  coreCourses: ["INDIVIDUAL PROJECT", "PROFESSIONAL SKILLS AND ISSUES"],
};

const year5 = {
  header: "YEAR 5",
  description: "Core courses:",
  coreCourses: [
    "RESEARCH METHODS AND TECHNIQUES FOR MSCI",
    "MSCI RESEARCH PROPOSAL AND PROJECT",
    "PROJECT RESEARCH READINGS IN COMPUTING SCIENCE",
  ],
};

const ielts = {
  header:
    "International English Language Testing System (IELTS) Academic module (not General Training)",
  description: "",
  coreCourses: [
    "6.5 with no sub-test under 6.0.",
    "Tests must have been taken within 2 years 5 months of start date. Applicants must meet the overall and subtest requirements using a single test",
    "IELTS One Skill Retake accepted.",
  ],
};

const toefl = {
  header: "TOEFL (ib, my best or athome)",
  description: "",
  coreCourses: [
    "90 with minimum R 20, L 19, S 19, W 23.",
    "Tests must have been taken within 2 years 5 months of start date. Combined scores from two tests taken within 6 months of each other can be considered.",
  ],
};

const iGCSE = {
  header: "School Qualification",
  description: "",
  coreCourses: ["iGCSE English or ESOL 0522/0500, grade C"],
};

const KMITL = {
  header: "",
  description:
    "The School of Computing Science and James Watt School of Engineering is offering a discount to students from King Mongkut's Institute of Technology Ladkrabang wishing to complete their 3rd and 4th year of the BSc Software Engineering/BEng Biomedical Engineering at the University of Glasgow. A progression to the MSci/MEng may be available depending on the student's performance in year 3 and 4.",
  coreCourses: [],
};

const tution = {
  header: "",
  description: "",
  coreCourses: [
    "2 years at KMITL, Tuition fee : THB 180,000 per year",
    "2 years at Glasgow, Tuition fee with scholarship : GBP 17,536 per year",
  ],
};

export const arr1 = [year1n2, year3, year4, year5];
export const arr2 = [ielts, toefl, iGCSE];
export const arr3 = [KMITL, tution];

export const slides = [
  {
    image: "https://www.gla.ac.uk/media/Media_772657_smxx.jpg",
    alt: "Glasgow University picture",
    title: "KMITL-Glasgow<br/> Double-Degree Program",
    description:
      "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
  },
  {
    image:
      "https://images.pexels.com/photos/11142526/pexels-photo-11142526.jpeg?cs=srgb&dl=pexels-lewis-ashton-117694088-11142526.jpg&fm=jpg",
    alt: "Glasgow University picture",
    title: "KMITL-Glasgow<br/> Double-Degree Program",
    description:
      "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
  },
];

export const HomeBody2Slides = [
  {
    image:
      "http://192.168.1.35:8000/uploads/AIHackaton.png",
    alt: "AI Hackathon",
    title: "INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI",
    description:
      "KMITL, The University of Queensland, and our sponsors are organizing this international hackathon to give you an opportunity to make the world a better place.Challenge your team to win a gold, silver or bronze prize for your efforts.",
  },
  {
    image:
      "https://oztrekk.com/wp-content/uploads/2018/12/queensland_campus.jpg",
    alt: "Queensland Univeristy picture",
    title: "KMITL - U. of Queensland",
    description:
      "Introducing KMITL - U. of Queensland Double-Degree Program in Software Engineering Invitation to join the talk on Friday 8 December 2023, 13.30 – 14.30, Room HM-206, HM Building, School of Engineering, KMITL Limited seats. Registration required: https://bit.ly/3R2xNrY",
  },
];

export const box1 = {
    head: "KMTIL - GLASGOW",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
    alt: "picture of glassgow university",
    des: "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
    logo: {
      src: "http://192.168.1.35:8000/uploads/UoG_white.png",
      alt: "Glasgow_logo",
      width: 250,
    },
  };

export const box2 = {
    head: "KMTIL - QUEENSLAND",
    img: "https://www.uq.edu.au/sites/default/files/styles/uqds_card/public/2023-12/st-lucia-campus.jpg?itok=39nkzdMY",
    alt: "picture of glassgow university",
    des: "The KMITL-Queensland Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Queensland (UQ), Australia. The program enables qualified students who have completed Year 2 in the Software Engineering program at KMITL to enter Years 3 and 4 of the Software Engineering program at the University of Queensland in Australia, and, upon completion, be awarded with software engineering degrees from both KMITL and UQ. The collaborative program aims to equip its students with advanced knowledge and skills of software engineering to prepare them for careers in the international software industry, as well as for research and postgraduate study in all computing-related fields.",
    logo: {
      src: "http://192.168.1.35:8000/uploads/UQ-post-white.png",
      alt: "Queensland_logo",
      width: 300,
    },
  };


export const card1 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/4270/4270578.png', alt: 'book', theme: 'dark', width: '50'},
    title: 'Curriculum', 
    content: 'Explore programs designed to build both knowledge and practical skills for success.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'book', theme: 'dark', width: '20'},
  }
  
export const card2 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3104/3104455.png', alt: 'admission', theme: 'dark', width: '50'},
    title: 'Admission', 
    content: 'Find out how to apply, meet the requirements, and join our growing community.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'admission', theme: 'dark', width: '20'},
  }
  
export const card3 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/864/864102.png', alt: 'about', theme: 'dark', width: '50'},
    title: 'About', 
    content: 'Learn about our mission, history, and commitment to academic excellence.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'about', theme: 'dark', width: '20'},
  }
  
export const card4 = {
    topIcon: {src: 'https://cdn-icons-png.flaticon.com/128/3037/3037825.png', alt: 'contact', theme: 'dark', width: '50'},
    title: 'Contact', 
    content: 'Get in touch with us through phone, email, or visit our campus for assistance.',
    buttomIcon: {src: 'https://cdn-icons-png.flaticon.com/128/545/545682.png', alt: 'contact', theme: 'dark', width: '20'},
  }
  

 export const menuItems = [
    { text: 'About', path: '/' },
    { text: 'Admission', path: '/admission' },
    { 
      text: 'Program',
      subItems: [
        { text: "Curriculum", path: "/curriculum" },
        { text: "KMITL-Glasgow", path: "/glasgow-doubledegree" },
        { text: "KMITL-Queensland", path: "/queensland-doubledegree" },
        { text: "Exchange-Study-Abroad", path: "/" },
        { text: "Internships", path: "/" }
      ]
    },
    { 
      text: 'Student',
      subItems: [
        { text: "Alumni", path: "/", smalltext: "SE student alumni" },
        { text: "Career Recommendation", path: "/", smalltext: "SE students' advisor" }
      ]
    },
    { 
      text: 'Facility',
      subItems: [
        { text: "Laboratory", path: "/" },
        { text: "Lecture Room", path: "/" },
        { text: "Co-working Space", path: "/" }
      ]
    }
  ]; 

  export const loggedInMenuItems = [
    { text: 'About', path: '/' },
    { text: 'Admission', path: '/admission' },
    { 
      text: 'Program',
      subItems: [
        { text: "Software-Engineering 2024", path: "/" },
        { text: "KMITL-Glasgow", path: "/glasgow-doubledegree" },
        { text: "KMITL-Queensland", path: "/queensland-doubledegree" },
        { text: "Exchange-Study-Abroad", path: "/" },
        { text: "Internships", path: "/" }
      ]
    },
    { 
      text: 'Student',
      subItems: [
        { text: "Alumni", path: "/", smalltext: "SE student alumni" },
        { text: "Career Recommendation", path: "/", smalltext: "SE students' advisor" },
        { text: 'Code Editor', path: '/se_academy' }
      ]
    },
    { 
      text: 'Facility',
      subItems: [
        { text: "Laboratory", path: "/" },
        { text: "Lecture Room", path: "/" },
        { text: 'Co-Working Space Booking System', path: '/coworkingspace' }
      ]
    }
    
  ]; 

  export const profileMenu = [
      {text: "Your Profile", path: "", smalltext: ""},
      {text: "Edit Profile", path: "", smalltext: ""},
      {text: "Sign Out", path: "", smalltext: ""}
    
  ];

  export const room1 = {
    roomName: "Room 1",
    roomImage: `${internetIPAddress}uploads/anonymous.png`, 
    amenities: ['Capacity of 5','Wi-Fi', 'Table', 'Smart-TV (Interactive Display Writing Board)'], 
    members: "3"
  };

  export const room2 = {
    roomName: "Room 2",
    roomImage: "https://media.discordapp.net/attachments/1280538997944225846/1287804527155740767/IMG_1058.png?ex=66f2e0ed&is=66f18f6d&hm=3c1893c8d7086c388e639bfa2c888c0fa6055ce784b7a6a5370d558cac5fc830&=&format=webp&quality=lossless&width=815&height=662",
    amenities: ['Capacity of 5','Wi-Fi', 'Table'],
    members: "3"
  }

  export const room3 = {
    roomName: "Room 3",
    roomImage: `${internetIPAddress}uploads/co-room3.jpg`,
    amenities: ['Capacity of 10','Wi-fi', 'Smart-TV (Interactive Display Writing Board)', 'Meeting desk'],
    members: "5"
  }

  export const edubackground = {
    header: "",
    description: "The applicant must satisfy at least one of the following requirements:",
    coreCourses: ["Graduated from or currently studying in Matthayom 6 (Thailand's Education System).","Graduated with qualifications equivalent to Matthayom 6, as recognized by the Ministry of Education.(Note that Applicants with this education background are requested to contact the SIIE office for further information.)","Graduated from or currently enrolled in an accredited college or higher education institution in Thailand or abroad."]
  }

  export const academicrecord = {
    header: "",
    description: "",
    coreCourses: [" SAT or GSAT Math score of 600 or above","or ACT Math score of 23 or above","or IB Diploma score for a subject in Mathematics with a score of 5 or above"," or AP test for a subject in Mathematics with a score of 4 or above","or A-Level or AS-Level for a subject in Mathematics with grade B or above","or A-Level Mathematics 1 (TCAS) with a score of 30 or above","or Cumulative GPA of all Math subjects in high school at least 3 out of 4 (or equivalent)","or National Standardized Test Score in Mathematic Subject of 75% or above"]
  }
  
  export const Languagerequirement = {
    header: "",
    description: "",
    coreCourses: ["TOEFL (Paper-based) with minimum score of 550", "TOEFL (Computer-based) with minimum score of 213", "TOEFL (Internet-based) with minimum score of 79", "IELTS with minimum score of 6.0","Cambridge English Exams FCE or CAE or CPE with minimum score of 170","IB – English A1 or A2 with minimum score of 4","IB – English B (HL) with minimum score of 5","KMITL-TEP with minimum score of B2","CU-TEP with minimum score of 90","Pearson PTE with minimum score of 55","Duolingo with minimum score of 110"]
  } 

  export const admissionschedule = {
    header: "",
    description: "",
    coreCourses: [" Application filing and Application Fee Payment Period : Now – November 11, 2024"," Interview Candidate Notification : November 18, 2024","Candidate Interview Date : November 23, 2024","Interview Result Announcement : November 29, 2024","TCAS Clearing House (for Thai Nationality only) : February 5 - 6, 2025","Announcement of admitted candidates with the details of how to make advanced payment of tuition fees : February 13, 2025","Enrolment confirmation and tuition fee payment : February 18 - 24, 2025"]
  }
  export const arr4 = [edubackground]
  export const arr5 = [academicrecord]
  export const arr6 = [Languagerequirement]
  export const arr7 = [admissionschedule]

  export const year1Semester1 = [
    {
      title: '01006710 : Introduction to Calculus',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Functions, limits, continuity and their applications, Mathematical induction, Introduction to derivative, Differentiation, Applications of derivative, Definite integrals, Antiderivative integration, Application of definite integral, Indeterminate forms, Improper integrals, Numerical integration, Sequences and series of numbers, Taylor series expansions of elementary functions",
      }
    }, 
    {
      title: '01286111 : Circuits and Electronics',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Description : Fundamentals electric circuit. Ohm's law, Kirchhoff's law, Thevenin's and Norton's theorems, superposition, capacitor, Inductor. Semiconductor devices, device current-voltage and frequency characteristics, P-N junction, diode circuits, analysis, and design of BJT and MOS transistor circuits, operational amplifier, and its applications.",
      }
    }, 
    {
      title: '01286120 : Elementary Systems Programming',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Description : This is an introductory course in systems programming using the Rust language. Emphasis is placed on developing the students’ abilities in the design and implementation of algorithms. The course describes the fundamentals of program design and implementation in Rust, variables and data types, input and output statements, conditional statements, loop statements, functions, modules, parameter passing, references and pointers, arrays and complex arrays, strings, files, memory, and ownership.",
      }
    }, 
    {
      title: '01286121 : Computer Programming',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "This is an introductory course in systems programming using the Rust language. Emphasis is placed on developing the students’ abilities in the design and implementation of algorithms. The course describes the fundamentals of program design and implementation in Rust, variables and data types, input and output statements, conditional statements, loop statements, functions, modules, parameter passing, references and pointers, arrays and complex arrays, strings, files, memory, and ownership.",
      }
    }, 
    {
      title: '96641009 : Intercultural Communication Skills In English 1',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "INTERCULTURAL COMMUNICATION SKILLS IN ENGLISH 1",
      }
    }, 
    {
      title: '96642170 : Introduction to Logic',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "-",
      }
    }, 
  ]

  export const year1Semester2 = [
    {
      title: '0006717 : Differential Equations',
      content: {
        prerequisite: "01006710 Introduction to Calculus of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Differential equations and their solutions; First-Order Differential Equations; Applications of First-Order Differential Equations; Explicit Method of Solving Higher-Order Linear Differential Equations; Applications of Second-Order Linear Differential Equations; Systems of Linear Equations",
      }
    }, 
    {
      title: '01006718 : Discrete Mathematics',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Basic set theory, theory and techniques of counting, properties of integers, mathematical induction, recursive definitions, recurrent equations, sequences and summations, relations, graphs, and trees",
      }
    }, 
    {
      title: '01286112 : Digital System Fundamental',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Introduction to digital systems; binary systems; Boolean algebra and simplification; combinational circuit; sequential components, i.e., Latches, flip-flops, registers, and counters; sequential circuits; basic ALU (arithmetic and logic unit) and control unit; hardware description language.",
      }
    }, 
    {
      title: '01286131 : Object-Oriented Programming',
      content: {
        prerequisite: "01286121 Computer Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "This course introduces the key concepts of object-oriented programming including objects and classes, encapsulation, abstraction, inheritances, polymorphism, as well as exception handling. Rather than the syntax of a particular programming language, the course emphasizes on how to think in term of objects. Students need to analyze program specifications and identify appropriate classes and objects. Additional programming topics include basic UML modelling such as class diagram and object diagram, principles of object-oriented design, and design patterns.",
      }
    }, 
    {
      title: '9664_ : (GENED) General Education Course',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (x-x-x)",
        description: "-",
      }
    }, 
    {
      title: '96641010 : Intercultural Communication Skills In English 2',
      content: {
        prerequisite: "96641009 INTERCULTURAL COMMUNICATION SKILLS IN ENGLISH 1",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "INTERCULTURAL COMMUNICATION SKILLS IN ENGLISH 2",
      }
    }, 
  ]

  export const year2Semester1 = [
    {
      title: '01006730 : Probablilty models and data analysis',
      content: {
        prerequisite: "01006710 Introduction to Calculus of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Combinatorial analysis, axioms of probability, conditional probability and independence, random variables, discrete random variables and probability distributions, continuous random variables and probability distributions, joint probability distributions and random samples, point estimation, statistical interval based on a single sample",
      }
    }, 
    {
      title: '01286213 : Computer Architecture and Organization',
      content: {
        prerequisite: "01286112 Digital System Fundamentals of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Description : Overview of computer architecture and organization; assembly programming and instruction set architecture; high-level software to low-level instructions; data representation; computer arithmetic; memory allocation and access; central processing unit; memory hierarchy; data transfer and input/output (I/O) techniques; measuring system performance. Additional topics include parallelism in computer architecture, and introduction to GPU.",
      }
    }, 
    {
      title: '01286222 : Data Structures and Algorithms',
      content: {
        prerequisite: "01286131 Object-Oriented Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Fundamental of solving problems using data structures including linked lists, trees, stacks, queues, hash tables, and graphs. Algorithms for sorting, searching, and other fundamental operations. Introduction to foundations for analysis of iterative and recursive algorithms. Implementation of selected algorithms using object-oriented paradigm.",
      }
    }, 
    {
      title: '01286233 : Web Programming',
      content: {
        prerequisite: "01286131 Object-Oriented Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "This course introduces the concepts of web programming and web applications development. The topics covered include basic construction of web page, HTML5, document object model (DOM), cascading style sheets (CSS), JavaScript, model-view-controller design, web framework, design concepts, as well as brief introduction to RESTful web services.",
      }
    }, 
    {
      title: '96641007 : Digital Citizen',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: "-",
      }
    }, 
    {
      title: '96644_ : (GENED) Language And Communication Course',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (x-x-x)",
        description: "-",
      }
    }, 
  ]
  
  export const year2Semester2 = [
    {
      title: '01006716 : Linear Algebra',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Matrices and system of linear equations; Solving system of linear equations; Vector spaces and subspaces; Orthogonality; Determinants; Eigenvalues and Eigenvectors; Linear transformation",
      }
    }, 
    {
      title: '01286223 : Computer Networks',
      content: {
        prerequisite: "01286112 Digital System Fundamentals of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Fundamental concepts and protocols in computer networks, particularly IP networks. Packet switching and circuit switching networks, layered network architectures. Application layer protocols, TCP/IP protocol suite, routing protocols, link layer protocols and multiple access networks. Wired and wireless local area network standards.",
      }
    }, 
    {
      title: '01286228 : Algorithm Design and Analysis',
      content: {
        prerequisite: "01286222 Data Structures and Algorithms of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "This course provides a study of theories and techniques of algorithm design and analysis. For algorithm design, students will study a wide range of algorithmic solutions to problems from various application areas, including searching, sorting, optimization, and important problems in graph theory. In addition, important design paradigms will be covered including greedy methods, divide-and-conquer methods, dynamic programming, backtracking, and branch-and-bound methods. For algorithm analysis, students will practice analyzing the execution time and the resource consumption of algorithms, and related mathematical techniques.",
      }
    }, 
    {
      title: '01286232 : Software Engineering Principles',
      content: {
        prerequisite: "01286131 Object-Oriented Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "This course is the study of important principles and concepts of software engineering, as well as an overview of software development processes. The topics include software development processes, requirement and specification of software, introduction to business process analysis and modelling, structured and object-oriented software analysis, design, and modelling, software verification and validation, software project management, software evolution and maintenance, and computer-aided software engineering (CASE) tools.",
      }
    }, 
    {
      title: '01286241 : Database Systems',
      content: {
        prerequisite: "01286222 Data Structures and Algorithms of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: "Database system concepts; files and databases; database system architecture; data entities and relationships; data modeling using Entity-Relation Diagrams and normalization technique; hierarchical; network and relational models of databases; query language and database language.",
      }
    }, 
    {
      title: '01286391 : Seminar In Software Engineering',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "0 (0-3-0)",
        description: "This course requires the students to attend seminars, lectures, and/or talks, given by invited speakers who are well-known in the software industry or in research and development in computing-related areas. The students are required to submit a written report summarizing what they have learned from each seminar.",
      }
    }, 
    {
      title: '96642022 : Philosophy Of Science',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "-",
      }
    }
  ]

  export const year3Semester1 = [
    {
      title: '01286324 : Operating Systems',
      content: {
        prerequisite: "01286213 Computer Architecture and Organization of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Organization and structure of operating systems. Control, communication, and synchronization of concurrent processes. Processor and job scheduling. Memory organization and management including paging, segmentation, and virtual memory. Resource management. Deadlock avoidance, detection, recovery. File system concepts and structure. Protection and security. Distributed processing. A brief introduction to OS virtualization and cloud computing.",
      }
    }, 
    {
      title: '01286326 : Theory of Computation',
      content: {
        prerequisite: "01006718 Discrete Mathematics of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: " Finite automata, regular expressions, push-down automata, context free grammars, pumping lemmas, Turing machines, Time and space complexity measures, P and NP complete problems.",
      }
    }, 
    {
      title: '01286334 : Software Design and Architecture',
      content: {
        prerequisite: "01286232 Software Engineering Principles of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course introduces basic concepts and principles of software design and software architecture. It starts with discussion on design issues, followed by coverage on design patterns. It then gives an overview of architectural structures and styles. Practical approaches and methods for creating and analyzing software architecture are presented. The emphasis is on the interaction between quality attributes and software architecture. Students will also gain experiences with examples in design pattern application and case studies in software architecture.",
      }
    }, 
    {
      title: '01286324 : Artificial Intelligence',
      content: {
        prerequisite: "01286222 Data Structures and Algorithms of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Meanings of artificial intelligence; Various knowledge representations, such as semantic networks, frames, rules, logic, etc.; Problem solving by search, i.e., uninformed search, heuristic search, playing games using search, elementary logic, logical reasoning, knowledge base systems, rule-based production systems; Expert systems; Machine learning, planning; Intelligent agents; Computer languages for artificial intelligence.",
      }
    }, 
    {
      title: '01286241 : Database Systems',
      content: {
        prerequisite: "01286222 Data Structures and Algorithms of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: "Database system concepts; files and databases; database system architecture; data entities and relationships; data modeling using Entity-Relation Diagrams and normalization technique; hierarchical; network and relational models of databases; query language and database language.",
      }
    }, 
    {
      title: '01286621 : Computer Graphics and Mixed Reality',
      content: {
        track: "For Metaverse",
        prerequisite: "01006716 Linear Algebra of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "verview of graphic systems; input-output devices; scan-conversion; two-dimensional transformations; translation; scaling; rotation; reflection; shearing; windowing concepts; clipping algorithms; window-to-viewport transformation; three-dimensional concepts; three-dimensional representations; three-dimensional transformations; three-dimensional viewing; hidden-surface and hidden-line removal; shading and color models; 3D worlds; computer graphic programming using OpenGL; introduction to Mixed Reality (MR), which includes Virtual Reality (VR) and Augmented Reality (AR); development of Metaverse web applications using WebGL Mixed Reality libraries or a Mixed Reality web framework.",
      }
    }, 
    {
      title: '01286622 : Web Service Development and Service-Oriented Architecture',
      content: {
        track: "For Metaverse",
        prerequisite: "01286233 Web Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course provides a study of web service development and Service Oriented Architecture (SOA) with an introduction to microservices and cloud computing. The class focuses on the technical concepts of web services based on HTTP and REST protocols, and how to develop RESTful service APIs using a web-service platform available. The course also introduces students to microservices, SOA, and how to develop microservices on a SOA for service scalability using cloud computing platform available.",
      }
    },
    {
      title: '01286622 : Web Service Development and Service-Oriented Architecture',
      content: {
        track: "For Industrial IoT",
        prerequisite: "01286233 Web Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course provides a study of web service development and Service Oriented Architecture (SOA) with an introduction to microservices and cloud computing. The class focuses on the technical concepts of web services based on HTTP and REST protocols, and how to develop RESTful service APIs using a web-service platform available. The course also introduces students to microservices, SOA, and how to develop microservices on a SOA for service scalability using cloud computing platform available.",
      }
    },
    {
      title: '01286641 : Real-Time Embedded System Design and Development',
      content: {
        track: "For Industrial IoT",
        prerequisite: "01286213 Computer Architecture and Organization of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "4 (3-3-8)",
        description: "Embedded systems are anywhere ranging from wearable devices, sensors, smart meters, drones, robots, and cars. This course provides a concrete study of real-time embedded system design and development. It covers the popular System-on-Chip (SoC) paradigm, real-time embedded system architectures, on-chip interconnects and memory systems, architectures of well-known embedded processors, such as ARM processors, models of computation and scheduling of embedded systems, multi-threading management, concepts of a real-time system, and finally metrics of embedded systems, i.e. performance, real-time characteristic, power consumption, reliability. For the system development part, the course covers the development lifecycle of a real-time embedded system. The purpose is to provide students with the knowledge and skills to design and develop a real-time embedded system. The course takes a requirement-driven design approach, where a functional specification is derived from a set of system requirements and then mapped into hardware and software components.",
      }
    },
    {
      title: '01286661 : AI Programming',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01286222 Data Structures and Algorithms of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "1 (0-3-2)",
        description: "This course covers sessions of hand-on programming of AI systems. It includes Prolog programming and Python AI programming. For Prolog programming, the students learn Prolog syntax, Prolog interpreter, backtracking mechanism, how to debug Prolog programs, lists, recursion, cuts, and meta-programming. For Python AI programming, the students learn how to use popular several Python libraries for developing machine learning, data science, and data analytic applications.",
      }
    },
    {
      title: '01286662 : Machine Learning',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01006730 PROBABILITY MODELS AND DATA ANALYSIS of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course provides a broad introduction to machine and statistical learning. Topics covered include supervised learning (generative/discriminative learning, parametric/non-parametric learning, neural networks, support vector machines); unsupervised learning (clustering, dimensionality reduction, recommender systems, deep learning); learning theory (bias/variance trade-offs; VC theory; large margins); reinforcement learning and adaptive control.",
      }
    },
    {
      title: '01286663 : Data Science and Data Analytics',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01006730 PROBABILITY MODELS AND DATA ANALYSIS of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course introduces an overview of data science and their applications on software applications. The topics to be studied include the extraction of information from data, an overview of important data analysis techniques, data visualization, software tools for data science, and case studies of real-world problem-solving using data science.",
      }
    }
  ]

  export const year3Semester2 = [
    {
      title: '01286327 : Compiler Construction',
      content: {
        prerequisite: "01286326 Theory of Computation of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course studies theories and concepts for constructing computer language translators. The topics include lexical analysis, syntax analysis, parser construction, syntax-directed translation, type checking, run-time environment handling, intermediate and machine code generation and code optimization, interpreter construction, together with case studies of compiler design and construction for some computer languages.",
      }
    }, 
    {
      title: '01286335 : Software Development Process and Project Management',
      content: {
        prerequisite: "01286232 Software Engineering Principles of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "A software development process is a set of activities, methods, and practices that are used in the production and maintenance process of software. This course is concerned with improving the processes used to develop and maintain high-quality software in a timely and economical manner. It covers the evolutions of different software development models and the currently popular and successful process models, for example, iterative software development (e.g. spiral models and the Rational Unified Process (RUP)), agile software development (e.g. Extreme Programming (XP), Agile Modeling (AM), Scrum, Crystal, Feature-Driven Development (FDD), and Incremental Funding Method (IFM)), Test-Driven Development (TDD), Personal Software Process (PSP), Team Software Process (TSP), and software maturity frameworks, such as the Capability Maturity Model (CMM). The course also covers software project management which includes estimating the effort in software projects, project planning and monitoring, costing and budgeting, risk management, testing strategies, and Quality assurance.",
      }
    }, 
    {
      title: '01286336 : User Experience and User Interface Design',
      content: {
        prerequisite: " 01286233 Web Programming of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course provides a comprehensive overview of the user experience and user interface design process, and is intended to familiarize students with the methods, concepts, and techniques necessary to make user experience design an integral part of developing information interfaces. The course provides students with an opportunity to acquire the resources, skills, and hands-on experience they need to design, develop, and evaluate information interfaces from a user-centered design perspective.",
      }
    }, 
    {
      title: '01286623 : Distributed Computing',
      content: {
        track: "For Metaverse",
        prerequisite: " 01286324 Operating Systems of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course covers a broad range of topics related to distributed systems, including distributed architectures, group communication, synchrony, clock synchronization, message ordering, mutual exclusion, distributed consensus, data replication, fault tolerance, and CAP theorem. Selected applications of distributed computing that are of current interest, such as distributed ledger technology and blockchains, are also studied.",
      }
    }, 
    {
      title: '01286624 : Advanced Database Systems',
      content: {
        track: "For Metaverse",
        prerequisite: "01286241 Database Systems of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: " Database management systems; structure and components; physical databases; access mechanisms; query processing; transaction processing; recovery control; concurrency control; distributed database systems; object-oriented databases; deductive databases.",
      }
    }, 
    {
      title: '01286642 : Industrial Iot Networks and Communications',
      content: {
        track: "For Industrial IoT",
        prerequisite: "01286223 Computer Networks of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: "With very limited memory and processing power as well as low energy consumption of IoT (Internet of Things) devices, their communication networks are so designed and developed to meet these constraints. This course will focus on widely industrial standards of computer networks and communications technologies developed specifically for industrial IoT devices, including network architectures and protocols layers. Another important topic covered by this course is network security for industrial IoT communication. It is the study how to make secure communications between industrial IoT devices by incorporating encryption into the communication protocol. Widely used encryption techniques are also studied.",
      }
    }, 
    {
      title: '01286643 : Cyber-Physical Systems and Industry 4.0',
      content: {
        track: "For Industrial IoT",
        prerequisite: "01286223 Computer Networks of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "We define any system that bridges the cyber-world of computing and communications with the physical world as cyber-physical systems (CPS). This course provides introduction to a CPS of an Industrial IoT system in a smart factory, and the concept of Digital Twin. As CPSs are the essential part of Industry 4.0, the course also provides introduction to Industry 4.0. In this course, the students study the foundation of factory automation, Programmable Logic Controllers (PLC), standard communication protocols for factory automation, and finally a SCADA (Supervisory Control And Data Acquisition) software, the software which is used to develop a CPS, in details with a hand-on case study of a real-world CPS for factory automation.",
      }
    },
    {
      title: '012866664 : Knowledge Representation and Reasoning',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01286342 Artificial Intelligence of Software-Engineering-2024 ",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course provides a comprehensive study of contemporary techniques and languages for knowledge representation and reasoning about knowledge. The course covers semantic modeling, e.g. semantic networks, conceptual graphs, ontology representation in Semantic Web, frame representation, rule-based representation, and logical representation, e.g. first-order logic, description logic, logic of actions and beliefs. For the reasoning about knowledge, the topics include abduction, deduction, induction, as well as reasoning about time, state, events, actions, and beliefs.",
      }
    },
    {
      title: '01286665 : Deep Learning',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01286662 Machine Learning of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Types of learning; Linear classification with perceptron; Basic optimization with gradient descent; Fully connected neural network; Loss function; Back-propagation algorithm; Convolutional neural network.",
      }
    },
    {
      title: '01286990 : Team Software Project',
      content: {
        track: "For Artificial Intelligence",
        prerequisite: "01286232 Software Engineering Principles of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (0-9-5)",
        description: "This is a software engineering project course in which the students work as a team to develop software and hardware according to the requirements provided by users. The students will learn to integrate their knowledge and skills to perform each phase of software (or system) development, including requirement analysis, modeling, design, implementation, and testing, in order to obtain the required software (or system), whose topic is decided by the advisor(s) or by the students themselves. In addition, the students must adopt relevant software development models as well as apply relevant project management methodologies for conducting and managing their team project.",
      }
    }
  ]


  export const year4Semester1 = [
    {
      title: '_ : Free Elective',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (x-x-x)",
        description: "-",
      }
    }, 
    {
      title: '01286325 : Information and Computer Security',
      content: {
        prerequisite: "01286223 Computer Networks of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "Overview of theories, principles, and knowledge in information security; Risk management, Access control; Encryption and Decryption; Physical security; Security architecture; Business continuity plan; Application security; Operating system and Service platform protections; Threats and Malwares; Basis of network security; Privacy, Ethical, and Legal issues.",
      }
    }, 
    {
      title: '012866_ : Major Elective for Track 1',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (x-x-x)",
        description: "-",
      }
    }, 
    {
      title: '01286991 : Software Engineering Project 1',
      content: {
        prerequisite: "01286232 Software Engineering Principles of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: " 3 (0-9-5",
        description: "This course is the first half of the senior project. In this course, the students will conduct their independent study, research and development of computer software and hardware using software engineering methodology according to their specialized track. The students will be guided by their project advisor(s) to conduct research and software (or system) development with the aim that they can develop their own original work with their creativity and problem solving skills. There is also an option for “industrial (software engineering) project” topics, to propose by project advisor(s) in order for the students and the advisor(s) to do a (software engineering) project according to their specialized track with companies, which the students can alternatively choose. The required project progress report must be submitted during the middle of the semester; and the entire project result of the semester will be presented to the examination committee at the end of the semester, where the project quality will be evaluated collectively for a team as well as be evaluated separately for each team member.",
      }
    }
  ]
  
  export const year4Semester2 = [
    {
      title: '_ : Free Elective',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: "3 (x-x-x)",
        description: "-",
      }
    }, 
    {
      title: '01286337 : Software Verification and Validation',
      content: {
        prerequisite: "01286232 Software Engineering Principles of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (3-0-6)",
        description: "This course studies three important methods for software verification and validation: testing, peer reviews, and formal verification, with emphasis on testing. Topics on testing include the necessity and limitations of testing, an overview of test processes, testing throughout the software development life cycle, unit testing, test design techniques, test automation, tool support for testing, and test management. The course will study how software peer reviews, which can help detect and prevent software defects, are carried out in practice and study the inspection processes throughout the software development life cycle, including the inspection of requirement documents, design documents, code, and test plans. The course will also provide a basic understanding of formal verification techniques, such as Hoare Logic and model checking.",
      }
    }, 
    {
      title: '01286992 : Software Engineering Project 2',
      content: {
        prerequisite: "01286991 Software Engineering Project 1 of Software-Engineering-2024",
        program: "Software-Engineering-2024",
        credit: "3 (0-9-5)",
        description: "This course is the continuation of Software Engineering Project 1. In this course, the students will conduct their independent study, research and development of computer software and hardware using software engineering methodology. The students will be guided by their project advisor(s) to conduct research and software (or system) development with the aim that they can develop their own original work with their creativity and problem solving skills. The required thesis must be submitted during the middle of the semester; and the entire project result of the two semesters will be presented to the examination committee at the end of the semester, where the project quality will be evaluated collectively for a team as well as be evaluated separately for each team member.",
      }
    }, 
    {
      title: '96642037 : Professional Skills and Issues',
      content: {
        prerequisite: "None",
        program: "Software-Engineering-2024",
        credit: " 3 (3-0-6)",
        description: "-",
      }
    }
  ]
  

  


  

