import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Qubit({bot_type}) {
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    company_name: "",
    fromEmail: "",
    smtp_password: "",
    fromName: "",
    chatbot_name: "",
    botResponseDelay: "0",
    tone: "",
    disableBot: false,
    floatingIcon: false,
    autoOpenChatbot: false,
    menuAfterGreetings: false,
    disablepersistentchathistory: false,
    greeting_message: "",
    farewell_message: "",
    disableboticonanimation:false,
    selectSpecificOpenAIModel:"",
    timesattemptnoresult: "",
    setupOpenAIAPIIntegration:'',
    predefined_intents:"",
    prompts: "",
  });
  console.log("bot type: " , bot_type);
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`https://bot.devspandas.com/api/panel/control-panel-settings?bot_type=${bot_type}`);
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        console.log('get data:', data.data.settings);
        setSettings({
          company_name: data.data.settings.company_name || "",
          fromEmail: data.data.settings.fromEmail || "",
          smtp_password: data.data.settings.smtp_password || "",
          fromName: data.data.settings.fromName || "",
          chatbot_name: data.data.settings.chatbot_name || "",
          botResponseDelay: data.data.settings.botResponseDelay || "0",
          tone: data.data.settings.tone || "",
          disableBot: data.data.settings.disableBot || false,
          floatingIcon: data.data.settings.floatingIcon || false,
          autoOpenChatbot: data.data.settings.autoOpenChatbot || false,
          menuAfterGreetings: data.data.settings.menuAfterGreetings || false,
          disablepersistentchathistory: data.data.settings.disablepersistentchathistory || false,
          greeting_message: data.data.settings.greeting_message || "",
          farewell_message: data.data.settings.farewell_message || "",
          disableboticonanimation: data.data.settings.disableboticonanimation || false,
          selectSpecificOpenAIModel: data.data.settings.selectSpecificOpenAIModel||"",
          timesattemptnoresult: data.data.settings.timesattemptnoresult || "",
          setupOpenAIAPIIntegration: data.data.settings.setupOpenAIAPIIntegration||'',
          predefined_intents: data.data.settings.predefined_intents||"",
          prompts: data.data.settings.prompts||"",
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
    // eslint-disable-next-line 
  }, []);
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();    
    console.log("Submit data:", settings);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://bot.devspandas.com/api/panel/create-control-panel-settings?bot_type=${bot_type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      // console.log('ghfghfgfhgh',JSON.stringify(response));
      if (!response.ok) {
        throw new Error("Failed to save settings");
      }
      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/general");
      }, 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSuccessMessage("An error occurred while saving settings.");
    }
  };
  if (loading) {
    return <div>Loading settings...</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid pt-4 px-4">
          <div className="row rounded mx-0">
            {/* <div className="col-md-12">
              <h2>{bot_type} Control panel</h2>
            </div> */}
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Name of Company</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="company_name"
                  className="form-control main-search"
                  placeholder="enter name . . . "
                  aria-label="Recipient Email"
                  value={settings.company_name}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="company_name" className="form-label">
                *Support and Call Back requests will be sent to this address
              </label>
            </div>
            <div className="col-md-3 p-3">
              <h5 className="mb-3">From Email Address</h5>
              <div>
                <input
                  type="email"
                  id="fromEmail"
                  className="form-control main-search"
                  placeholder="wordpress@localhost"
                  aria-label="From Email Address"
                  value={settings.fromEmail}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="fromEmail" className="form-label">
                *Emails will be sent from this address. Make sure that the domain name is the same.
              </label>
            </div>
            <div className="col-md-3 p-3">
              <h5 className="mb-3">SMTP Password</h5>
              <div className="input-group">
                <input
                  type={show ? "text" : "password"}
                  id="smtp_password"
                  className="form-control main-search"
                  aria-label="From Email Address"
                  placeholder="Password . . ."
                  value={settings.smtp_password}
                  onChange={handleChange}
                />
                <button type="button" className="input-group-text eyebutton" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}><i className={show ? "fas fa-eye" : "fas fa-eye-slash"}></i></button>
              </div>
              <label htmlFor="smtp_password" className="form-label">
                SMTP Password
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">From Name</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="fromName"
                  className="form-control main-search"
                  placeholder="Wordpress"
                  aria-label="From Name"
                  value={settings.fromName}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="fromName" className="form-label">
                *From name for email address
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Bot name</h5>
              <div>
                <input
                  type="text"
                  id="chatbot_name"
                  className="form-control main-search"
                  placeholder="name . . . "
                  aria-label="Reply To Address"
                  value={settings.chatbot_name}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="chatbot_name" className="form-label">
                *Please set the Reply To address. By default, Reply To address will be From Email Address.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Bot Response Delay</h5>
              <select id="botResponseDelay" value={settings.botResponseDelay} className="form-select main-search" onChange={handleChange}>
                <option value="0">0 Second</option>
                <option value="5">5 Second</option>
                <option value="10">10 Second</option>
                <option value="60">1 Minuts</option>
              </select>
              <label htmlFor="botResponseDelay" className="form-label">
                Delay between bot customer query and chatbot response in the conversation.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Tone</h5>
              <select id="tone"
                value={settings.tone}
                className="form-select main-search" onChange={handleChange}>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
              </select>
              <label htmlFor="tone" className="form-label">
                Change behaviour of bot
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Bot</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disableBot"
                  role="switch"
                  className="form-check-input"
                  aria-label="Disable ChatBot"
                  checked={settings.disableBot}
                  onChange={handleChange}
                />
                <label htmlFor="disableBot" className="form-check-label">
                  Disable Loading the ChatBot on Front End completely
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Floating Icon</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="floatingIcon"
                  role="switch"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={settings.floatingIcon}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Enable floating icon
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Auto Open Chatbot Window For First Time Page Load</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="autoOpenChatbot"
                  role="switch"
                  className="form-check-input"
                  aria-label="Auto Open Chatbot"
                  checked={settings.autoOpenChatbot}
                  onChange={handleChange}
                />
                <label htmlFor="autoOpenChatbot" className="form-check-label">
                  Enable to open chatbot window automatically for first time page load.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Show Start Menu After Greetings</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  role="switch"
                  id="menuAfterGreetings"
                  checked={settings.menuAfterGreetings}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="menuAfterGreetings" className="form-check-label">
                  Show Start Menu After Greetings
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Persistent Chat History</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disablepersistentchathistory"
                  className="form-check-input"
                  role="switch"
                  checked={settings.disablepersistentchathistory}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablepersistentchathistory" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Animations</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disableboticonanimation"
                  className="form-check-input"
                  role="switch"
                  checked={settings.disableboticonanimation}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disableboticonanimation" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Setup OpenAI API Integration</h5>
              <div className="form-check ">
                <input
                  type="text"
                  id="setupOpenAIAPIIntegration"
                  className="form-control main-search"
                  value={settings.setupOpenAIAPIIntegration}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="setupOpenAIAPIIntegration" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Configure Bot Activity Hours</h5>
              <div className="mb-3">
                <input
                  type="time"
                  id="timesattemptnoresult"
                  className="form-control main-search"
                  placeholder="enter name . . . "
                  aria-label="Recipient Email"
                  value={settings.timesattemptnoresult}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="timesattemptnoresult" className="form-label">
                *Support and Call Back requests will be sent to this address
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Select Specific OpenAI Model</h5>
              <select id="selectSpecificOpenAIModel" value={settings.selectSpecificOpenAIModel} className="form-select main-search" onChange={handleChange}>
                <option value="3.0">3.0</option>
                <option value="3.1">3.1</option>
                <option value="3.2">3.2</option>
              </select>
              <label htmlFor="selectSpecificOpenAIModel" className="form-label">
                Delay between bot customer query and chatbot response in the conversation.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Predefined Intents – FAQ</h5>
              <div className="mb-3">
                <textarea
                  id="predefined_intents"
                  className="form-control main-search"
                  placeholder="Message here . . ."
                  aria-label="Recipient Email"
                  value={settings.predefined_intents}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="predefined_intents" className="form-label">
                *Write your first greeting message.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Greeting Message</h5>
              <div className="mb-3">
                <textarea
                  id="greeting_message"
                  className="form-control main-search"
                  placeholder="Message here . . ."
                  aria-label="Recipient Email"
                  value={settings.greeting_message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="greeting_message" className="form-label">
                *Write your first greeting message.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Farewell Message</h5>
              <div className="mb-3">
                <textarea
                  id="farewell_message"
                  className="form-control main-search"
                  placeholder="Message here . . ."
                  aria-label="Recipient Email"
                  value={settings.farewell_message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="farewell_message" className="form-label">
                *Write your Farewell message.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">prompts</h5>
              <div className="mb-3">
                <textarea
                  id="prompts"
                  className="form-control main-search"
                  placeholder="Message here . . ."
                  aria-label="Recipient Email"
                  value={settings.prompts}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="prompts" className="form-label">
                *Write your Farewell message.
              </label>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4 px-4">
          <div className="rounded-top p-4">
            <div className="row">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              <div className="col-12">
                <button className="btn btn-primary mt-3 submit-button">Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Qubit