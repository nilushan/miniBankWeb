
// import './App.css';
import { Container } from 'react-bootstrap';
import { TransactionsComponent } from './features/transactions/TransactionsComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        <Container >

          <TransactionsComponent></TransactionsComponent>
        </Container>

      </header>
    </div>
  );
}

export default App;
