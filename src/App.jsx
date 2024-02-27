import React from "react";
import Logs from "./Logs"
import { Route, Routes } from "react-router-dom";
import Log from "./Log";
import LogForm  from "./LogForm";
import LogEdit from "./LogEdit";
const App = () => {
  return (
    <div>
      <h1>Logs CRUD</h1>
      <Routes>
        <Route path="/">
          <Route index element={<Logs />}/>
          <Route path="/create" element={<LogForm />}/>
          <Route path=":id" element={<Log />}/>
          <Route path=":id/edit" element={<LogEdit />} />
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;
