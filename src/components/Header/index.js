import React from 'react';
import './style.css';

import { AmplifySignOut} from '@aws-amplify/ui-react';


function Header() {
  return (
    <header>
      <h1>Spoiler App</h1>
      <AmplifySignOut />
    </header>
  );
}

export default Header;