import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { CharacterSelect } from './pages/CharacterSelect';
import { StoryInput } from './pages/StoryInput';
import { StoryGenerator } from './pages/StoryGenerator';
import { StoryReader } from './pages/StoryReader';
import { StoryShelf } from './pages/StoryShelf';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create/character" element={<CharacterSelect />} />
          <Route path="create/topic" element={<StoryInput />} />
          <Route path="create/generating" element={<StoryGenerator />} />
          <Route path="story/:id" element={<StoryReader />} />
          <Route path="shelf" element={<StoryShelf />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
