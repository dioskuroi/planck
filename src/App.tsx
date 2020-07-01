import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/button/button'
import Alert from './components/alert/alert'
import Menu from './components/menu/menu'
import MenuItem from './components/menu/menu-item'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button className="custom" onClick={ () => console.log(1) }>Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType={ ButtonType.Danger } size={ ButtonSize.Small }>Hello</Button>
        <Button 
          btnType={ ButtonType.Primary } 
          size={ ButtonSize.Large }
          disabled>
          Hello World
        </Button>
        <Button 
          btnType={ ButtonType.Link } 
          href="https://www.baidu.com">
          Link Baidu
        </Button>
        <Button 
          btnType={ ButtonType.Link } 
          href="https://www.baidu.com"
          disabled>
          Link Baidu
        </Button>
        <Alert>Hello World</Alert>
        <Alert type="success">Hello Wolrd</Alert>
        <Alert type="danger" title="React">Hello Wolrd</Alert>
        <Alert type="warning" showClose={ false }>Hello Wolrd</Alert>
        <Menu defaultIndex={0}>
          <MenuItem index={0}>cool link 1</MenuItem>
          <MenuItem index={1} disabled>cool link 2</MenuItem>
          <MenuItem index={2}>cool link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;