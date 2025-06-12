import React from 'react';
import DynamicForm from './components/DynamicForm';
import Header from './components/Header';
import Info from './components/Info';
import './style.css';

function App() {
  return (
<div className="min-h-screen bg-eggshell">
  <Header />
  <DynamicForm />
  <Info />
</div>
  );
}

export default App;