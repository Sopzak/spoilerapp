import React, { useState, useEffect } from 'react';
import './style.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listSpoilers } from '../../graphql/queries';
import { createSpoiler as createSpoilerMutation, deleteSpoiler as deleteSpoilerMutation } from '../../graphql/mutations';

const initialFormState = { name: '', description: '' }

function Home() {
  const [spoilers, setSpoiler] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchSpoiler();
  }, []);

  async function fetchSpoiler() {
    const apiData = await API.graphql({ query: listSpoilers });
    setSpoiler(apiData.data.listSpoilers.items);
  }

  async function createSpoiler() {
    console.log('fhgkjdh');
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createSpoilerMutation, variables: { input: formData } });
    setSpoiler([ ...spoilers, formData ]);
    setFormData(initialFormState);
  }

  async function deleteSpoiler({ id }) {
    const newSpoilerArray = spoilers.filter(spoiler => spoiler.id !== id);
    setSpoiler(newSpoilerArray);
    await API.graphql({ query: deleteSpoilerMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>Spoiler App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Spoiler name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'email': e.target.value})}
        placeholder="e-mail"
        value={formData.email}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Spoiler description"
        value={formData.description}
      />
      <button onClick={createSpoiler}>Create Spoiler</button>
      <div style={{marginBottom: 30}}>
        {
          spoilers.map(spoiler => (
            <div key={spoiler.id || spoiler.name}>
              <h2>{spoiler.name}</h2>
              <h2>{spoiler.email}</h2>
              <p>{spoiler.description}</p>
              <button onClick={() => deleteSpoiler(spoiler)}>Delete spoiler</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

//Now it`s necessary autentication to enter 
export default withAuthenticator(Home);