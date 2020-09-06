import React, { useState, useEffect } from 'react';
import './style.css';
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { listSpoilers } from '../../graphql/queries';
import { createSpoiler as createSpoilerMutation, deleteSpoiler as deleteSpoilerMutation } from '../../graphql/mutations';
import SpoilerCard from '../SpoilerCard';


const initialFormState = { name: '', description: '' }

function Home() {
  const [spoilers, setSpoiler] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setStateModal] = useState("none");

  useEffect(() => {
    fetchSpoiler();
  }, []);

  async function fetchSpoiler() {
    const apiData = await API.graphql({ query: listSpoilers });
    setSpoiler(apiData.data.listSpoilers.items);
  }

  async function createSpoiler() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createSpoilerMutation, variables: { input: formData } });
    setSpoiler([ ...spoilers, formData ]);
    setFormData(initialFormState);
  }

  async function replaySpoiler() {
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
    <div className="home-page">
        <div className="container">
            <div className="modal" style={{display: showModal}}>
              <div className="modal-content">
                <span 
                  className="close" 
                  onClick={() => {setStateModal("none");}}>
                    &times;
                </span>
                <input
                    aria-label={"name"}
                    aria-required="true"
                    onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                    placeholder="Name"
                    className="textinput" 
                    value={formData.name}
                />
                <input
                    aria-label={"e-mail"}
                    aria-required="true"
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'email': e.target.value})}
                    placeholder="e-mail"
                    value={formData.email}
                />
                <textarea 
                    aria-label={"Spoiler description"}
                    aria-required="true"
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                    placeholder="Spoiler description"
                    value={formData.description}
                />
                <button 
                    className="btn"
                    aria-label={"Create Spoiler"}
                    onClick={createSpoiler}>
                        Create Spoiler
                </button>
              </div>
            </div>
            <button 
                aria-label={"Add Spoiler"}
                onClick={() => {setStateModal("block");}}>
                    Add Spoiler
            </button>
            <div style={{marginBottom: 30, maxHeight:'500px', minHeight: '300px', overflowY: 'scroll' }}>
                {
                    spoilers.map(spoiler => (
                    <div key={spoiler.id}>
                      <SpoilerCard spoiler={spoiler} 
                        onBtnReplay={() => replaySpoiler(spoiler)}
                        onBtnDelete={() => deleteSpoiler(spoiler)} />
                    </div>
                    ))
                }
            </div>
        </div>
    </div>
  );
}

//Now it`s necessary autentication to enter 
export default withAuthenticator(Home);