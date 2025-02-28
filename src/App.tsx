import React from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header />
      <main className="flex-1 flex flex-col">
        <ChatContainer />
      </main>
    </div>
  );
}

export default App;