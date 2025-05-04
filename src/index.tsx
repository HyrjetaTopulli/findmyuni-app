// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';

// Generate the articles data to be added to the database
// These will be stories related to the universities mentioned in the CSV file
const generateArticles = () => {
  return [
    {
      id: '1',
      title: 'Student Life at Harvard University: A Day in the Life',
      content: 'Harvard University is known for its rigorous academics, but student life on campus is just as vibrant and engaging. From joining one of the hundreds of student organizations to attending world-class lectures and events, Harvard students have countless opportunities to explore their interests and build lasting connections. This article follows Sarah, a junior studying Computer Science, as she navigates a typical day on campus - from morning classes at the Science Center to afternoon research in the Innovation Lab, and evening activities with her residential house community. With its historic buildings, state-of-the-art facilities, and diverse student body, Harvard offers a unique educational environment that extends far beyond the classroom.',
      image: '/images/articles/harvard-student-life.jpg',
      date: '2025-04-15',
      universityId: '1',
      category: 'Student Life',
    },
    {
      id: '2',
      title: 'Oxford Research Breakthrough in Quantum Computing',
      content: 'Researchers at the University of Oxford have made a significant breakthrough in quantum computing that could revolutionize the field. The team, led by Professor Elizabeth Hughes at the Department of Physics, has developed a new method for stabilizing quantum bits (qubits), addressing one of the major obstacles in developing practical quantum computers. This innovation could potentially accelerate the development of larger and more powerful quantum systems capable of solving complex problems beyond the reach of classical computers. The research, published in Nature Physics, has already attracted attention from major technology companies looking to advance their own quantum computing initiatives. This breakthrough demonstrates Oxford\'s continued leadership in cutting-edge scientific research that pushes the boundaries of what\'s possible in modern computing.',
      image: '/images/articles/oxford-quantum.jpg',
      date: '2025-04-10',
      universityId: '2',
      category: 'Research',
    },
    {
      id: '3',
      title: 'How to Choose the Right University for You: A Comprehensive Guide',
      content: 'Selecting the right university is one of the most important decisions you\'ll make in your educational journey. This comprehensive guide walks you through the key factors to consider, from academic programs and faculty expertise to campus culture, location, and financial considerations. We examine the value of rankings versus personal fit, and provide a practical framework for evaluating your options. The article includes insights from admissions counselors and recent graduates on what they wish they had known during the university selection process. With thoughtful research and self-reflection, you can find an institution that not only meets your academic needs but also provides the environment where you\'ll thrive personally and professionally. Remember, the "best" university is ultimately the one that\'s best for you and your unique goals.',
      image: '/images/articles/choose-university.jpg',
      date: '2025-04-05',
      category: 'Advice',
    },
    {
      id: '4',
      title: 'MIT\'s New Approach to Engineering Education',
      content: 'The Massachusetts Institute of Technology has unveiled a revolutionary approach to engineering education that combines traditional technical training with humanitarian challenges. The new curriculum, called "Engineering for Humanity," integrates project-based learning focused on addressing global issues like climate change, healthcare access, and sustainable development. First-year students will now participate in cross-disciplinary teams working on real-world problems in partnership with communities and organizations. This shift represents MIT\'s commitment to developing engineers who are not only technically proficient but also socially conscious and prepared to tackle complex societal challenges. Faculty leaders believe this approach will better prepare graduates for the increasingly interconnected and ethically complex technological landscape they\'ll enter after graduation.',
      image: '/images/articles/mit-engineering.jpg',
      date: '2025-03-28',
      universityId: '3',
      category: 'Academic Programs',
    },
    {
      id: '5',
      title: 'Stanford University Launches Innovative Climate Change Initiative',
      content: 'Stanford University has announced the launch of a major interdisciplinary initiative aimed at accelerating solutions to the climate crisis. The Stanford Climate Action Program will bring together researchers from across the university\'s seven schools to collaborate on breakthrough technologies, policy frameworks, and business models that can drive rapid decarbonization. With initial funding of $300 million from the university and private donors, the program will establish new research centers, create fellowship opportunities for students and visiting scholars, and build partnerships with government agencies and industry leaders. Stanford\'s president highlighted that addressing climate change requires not only scientific and technological innovation but also advances in policy, economics, and communication - areas where the university\'s breadth of expertise can make a significant contribution.',
      image: '/images/articles/stanford-climate.jpg',
      date: '2025-03-20',
      universityId: '4',
      category: 'Research',
    },
    {
      id: '6',
      title: 'Financing Your Education: Scholarships, Grants, and Financial Aid Explained',
      content: 'The cost of higher education shouldn\'t be a barrier to accessing quality education. This comprehensive article demystifies the various financial aid options available to students, from university-specific scholarships and government grants to work-study programs and student loans. We break down the differences between need-based and merit-based aid, explain how to interpret financial aid offers, and provide strategies for maximizing your aid package. The guide includes a timeline for application deadlines, tips for crafting compelling scholarship essays, and resources for finding lesser-known funding opportunities. With careful planning and a proactive approach to financial aid, you can significantly reduce the out-of-pocket cost of your education and make informed decisions about financing your academic future.',
      image: '/images/articles/financial-aid.jpg',
      date: '2025-03-15',
      category: 'Financial Aid',
    },
    {
      id: '7',
      title: 'Cambridge University\'s Historic Library Gets Digital Transformation',
      content: 'The centuries-old libraries of Cambridge University are undergoing a digital transformation that will make their vast collections accessible to scholars worldwide. The ambitious project, which began last year, involves digitizing millions of rare manuscripts, books, and archives dating back to the medieval period. Using state-of-the-art imaging technology, conservators are creating high-resolution digital copies that capture even the smallest details of these precious materials. Beyond preservation, this initiative democratizes access to knowledge that was previously available only to those who could visit Cambridge in person. The university has also developed a sophisticated online platform with advanced search capabilities and virtual exhibitions that contextualize the collections. This blend of centuries-old scholarship with cutting-edge technology reflects Cambridge\'s commitment to both preserving history and embracing innovation.',
      image: '/images/articles/cambridge-library.jpg',
      date: '2025-03-08',
      universityId: '5',
      category: 'Campus News',
    },
    {
      id: '8',
      title: 'The Rise of Interdisciplinary Programs in Higher Education',
      content: 'Traditional academic boundaries are increasingly blurring as universities around the world embrace interdisciplinary education. This article examines the growing trend of programs that combine multiple fields of study, from computational biology and digital humanities to sustainable business and neuroeconomics. We explore the benefits of this approach - including innovation at the intersection of disciplines and preparation for complex real-world challenges - as well as the institutional challenges of implementing truly integrated curricula. Interviews with faculty and students from pioneering programs highlight the unique skills developed through interdisciplinary education and the career advantages it can provide. As complex global problems require multifaceted solutions, universities are recognizing that interdisciplinary thinking isn\'t just beneficial but essential for preparing graduates to make meaningful contributions in their fields.',
      image: '/images/articles/interdisciplinary-programs.jpg',
      date: '2025-03-01',
      category: 'Education Trends',
    },
    {
      id: '9',
      title: 'ETH Zurich Celebrates 50 Years of Computer Science Innovation',
      content: 'ETH Zurich, one of Europe\'s leading technical universities, is celebrating the 50th anniversary of its Computer Science department with a year-long series of events highlighting its contributions to the field. Since its founding in 1975, the department has been at the forefront of computer science research, producing breakthroughs in areas including cryptography, machine learning, and computer graphics. The anniversary program includes a major international conference, an interactive exhibition on the evolution of computing, and the establishment of new research initiatives focused on next-generation computing challenges. Alumni of the program, who now hold leadership positions at major technology companies and research institutions worldwide, are returning to campus to share insights with current students and faculty. ETH Zurich\'s president noted that the university\'s emphasis on fundamental research combined with practical applications has been key to its lasting impact on the field.',
      image: '/images/articles/eth-zurich-cs.jpg',
      date: '2025-02-20',
      universityId: '6',
      category: 'Anniversary',
    },
    {
      id: '10',
      title: 'Virtual Exchange Programs: The New Frontier in International Education',
      content: 'As technology breaks down geographical barriers, universities worldwide are embracing virtual exchange programs as a complement to traditional study abroad opportunities. These innovative programs allow students to engage in cross-cultural learning experiences without leaving their home campuses. Through collaborative online courses, virtual reality campus tours, and digital cultural exchanges, students can develop global perspectives and intercultural competencies that are increasingly valued by employers. This article explores successful models from universities that have pioneered virtual exchanges, addressing both the advantages and limitations compared to physical mobility programs. While nothing fully replaces the immersive experience of living in another country, virtual exchanges can democratize access to international education and prepare students for increasingly globalized and digital professional environments.',
      image: '/images/articles/virtual-exchange.jpg',
      date: '2025-02-15',
      category: 'International Education',
    },
  ];
};

// Write the tailwind config for styling
const tailwindConfig = `
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

// Write the CSS styles for the application
const styles = `
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  background-color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
