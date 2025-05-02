// src/components/layout/MainLayout.js
import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Navbar from '../Navbar';
import SmartQuiz from '../../pages/SmartQuiz';
import ToDoList from '../../pages/ToDoList';
import DoubtForum from '../../pages/DoubtForum';

const MainLayout = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path={`${path}`} component={SmartQuiz} /> {/* Default to quiz */}
          <Route path={`${path}todo`} component={ToDoList} />
          <Route path={`${path}forum`} component={DoubtForum} />
        </Switch>
      </div>
    </>
  );
};

export default MainLayout;
