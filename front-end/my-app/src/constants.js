export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};

export const CODE_SNIPPETS = {
  javascript:
    '\nfunction greet(name) {\n\tconsole.log("Hello, " + name  + "!");\n}\n\ngreet("Alex");\n',
  python:
    '\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n',
  java: '\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n',
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
      "https://scontent.fbkk12-3.fna.fbcdn.net/v/t39.30808-6/452136780_122156183210113552_6127710143014766341_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=oo9HtcAIW6YQ7kNvgGDm3Ii&_nc_ht=scontent.fbkk12-3.fna&oh=00_AYAgZC2gppuvJklaePQDwaDdxQDQysRzdsm-q0Zi-fW3hQ&oe=66E63D4C",
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
  {
    image:
      "https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/452160181_122156183480113552_8005584317376542048_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=8zBqRYVVfhkQ7kNvgG0w4cw&_nc_ht=scontent.fbkk9-2.fna&_nc_gid=ADQ8qEvpNQMXnfLmgQE-kS2&oh=00_AYCyaXRdf7Gb5kYUy51TcGivANb3Iz4FWKSh-0WeguITjg&oe=66E652F1",
    alt: "INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI",
    title: "INTERNATIONAL AI HACKATHON 2024 <br/>SAVING THE WORLD WITH AI",
    description:
      "KMITL, The University of Queensland, and our sponsors are organizing this international hackathon to give you an opportunity to make the world a better place.Challenge your team to win a gold, silver or bronze prize for your efforts.",
  },
];

export const box1 = {
    head: "KMTIL - GLASGOW",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/45/1c/9d/university-of-glasgow.jpg?w=1200&h=1200&s=1",
    alt: "picture of glassgow university",
    des: "The KMITL-Glasgow Double-Degree Program in Software Engineering is a collaboration between KMITL and the University of Glasgow, UK. The program enables qualified students who have completed Year 2 in the SE program at the International College to enter Years 3 and 4 of the Software Engineering program at the University of Glasgow's School of Computing Science. At Glasgow, the student will have an opportunity to study with world-renowned academics, as well as working on team projects with multi-national talents. This is an excellent opportunity for the students who wish to gain studying and living experience in the UK.",
    logo: {
      src: "https://historicalthesaurus.arts.gla.ac.uk/graphics/UoG_white.png",
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
      src: "https://media.discordapp.net/attachments/1280538997944225846/1281298923629314109/UQ-post-white2.png?ex=66db361c&is=66d9e49c&hm=dc9e1855caa2531d2cef2f425e687c283f399412b5625ec4e6bead6617fd5b8f&=&format=webp&quality=lossless&width=567&height=207",
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
  