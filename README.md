# LEARNIX - Smart Exam Preparation Platform

A student-focused AI exam preparation platform that helps students prepare specifically for their teacher's exams through personalized practice tests, performance tracking, and peer/teacher support.

## Features

✨ **Dashboard** - Your personal exam preparation command center
- Quick stats and summary cards
- Focus areas visualization  
- Recent activity tracking
- Smart recommendations

📝 **Generate Paper** - Create personalized practice tests
- Multiple paper types (Practice, Unit Test, Semester Sample)
- Focus options (Full Syllabus, Weak Areas, Selected Topics)
- Configurable difficulty levels
- Multiple question types
- Generated from teacher pattern + student weakness + course material

✅ **Test Taking** - Distraction-free test interface
- Question navigation
- Mark for review functionality
- Real-time progress tracking
- Question difficulty feedback after submission

📊 **Performance Tracking**
- Overall accuracy metrics
- Topic-wise performance breakdown
- Strength and weakness areas
- Improvement trends
- Recent test history

📚 **My Materials** - Organize study resources
- Upload PDFs, PPTs, DOCs, previous papers
- Automatic topic extraction
- Processing status tracking
- Material library management

🆘 **Who Can Help Me?** - Match with best support
- Submit doubts with context
- AI-powered helper matching
- Multiple helper types (Senior Students, Junior Teachers, Senior Teachers)
- Expertise and availability consideration
- Structured escalation path

👤 **Profile** - Account and preferences
- Personal information
- Courses and subjects
- Teacher pattern insights
- Settings and notifications
- Learning preferences

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. **Install Node.js** (if not already installed)
   ```bash
   # On macOS with Homebrew
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Install Dependencies**
   ```bash
   cd /Users/yashbiradar/College/Hackathon
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The app will open in your browser at `http://localhost:5173`

4. **Build for Production**
   ```bash
   npm run build
   ```

   Optimized production build will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (Button, Card, etc.)
│   └── dashboard/          # Dashboard-specific components
├── pages/                  # Page components
│   ├── Dashboard.tsx
│   ├── GeneratePaper.tsx
│   ├── Test.tsx
│   ├── Performance.tsx
│   ├── Materials.tsx
│   ├── WhoCanHelp.tsx
│   ├── MyTests.tsx
│   └── Profile.tsx
├── services/               # Mock API services
│   ├── paperService.ts
│   ├── analysisService.ts
│   ├── doubtService.ts
│   ├── studentService.ts
│   └── materialsService.ts
├── layouts/                # Layout components
│   └── DashboardLayout.tsx
├── data/                   # Mock data
│   └── mockData.ts
├── types/                  # TypeScript types
│   └── index.ts
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
├── index.css               # Global styles
└── vite-env.d.ts          # Vite type definitions
```

## Key Concepts

### Mock Services
All backend functionality is simulated through mock services in `src/services/`. These can be easily replaced with real API calls:

```typescript
// Example: Replace mock implementation with API call
const paper = await fetch('/api/papers/generate', {
  method: 'POST',
  body: JSON.stringify(config)
}).then(r => r.json());
```

### Type Safety
Full TypeScript support with interfaces for all data models in `src/types/index.ts`

### Responsive Design
- Desktop: Full sidebar navigation, multi-column layouts
- Tablet: Adapted sidebar, 2-column layouts
- Mobile: Compact navigation, single-column layouts

## Mock Data Features

The application includes realistic mock data:
- **Student Profile**: Yash Biradar with multiple courses
- **Topics**: 7 different topics with varying accuracy levels
- **Performance Data**: Realistic test scores and trends
- **Helpers**: Senior students, junior teachers, and senior teachers with ratings
- **Materials**: Sample uploaded files with processing status

## Usage Examples

### Generate a Practice Paper
1. Click "Generate Paper" in sidebar
2. Configure: type, focus, difficulty, number of questions
3. Click "Generate Paper"
4. Review generated paper details
5. Click "Start Test" to begin

### Take a Test
1. Read the instructions
2. Click "Start Test"
3. Navigate through questions using Next/Previous buttons
4. Mark questions for review if needed
5. Click "Submit Test" when done
6. View results and difficulty feedback

### Get Help
1. Navigate to "Who Can Help Me?"
2. Fill in your doubt details
3. Specify complexity level
4. Click "Find Someone"
5. Review matched helper
6. Click "Connect Now"

## Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the purple/indigo color scheme:

```typescript
colors: {
  primary: {
    // Adjust these values
    600: '#9333ea',
    700: '#7e22ce',
    // ... etc
  }
}
```

### Mock Data
Edit `src/data/mockData.ts` to change student info, topics, materials, etc.

### Services
Modify `src/services/*` files to connect with real backend APIs

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Responsive mobile browsers

## Performance

- Fast initial load with Vite bundling
- Optimized images and icons with Lucide
- Smooth animations with CSS transitions
- Responsive lazy loading ready

## Next Steps (To Deploy)

1. Replace mock services with real API endpoints
2. Add authentication (login/signup)
3. Connect to backend database
4. Set up file upload to cloud storage
5. Implement real AI/ML for paper generation and matching
6. Add WebSocket for real-time helper chat
7. Deploy to hosting platform (Vercel, Netlify, etc.)

## License

This project is created for educational purposes.

---

**Built with ❤️ for students by students**
