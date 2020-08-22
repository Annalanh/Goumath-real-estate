import React from 'react';
import { withTranslation } from 'react-i18next';
class ErrorPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
          Not permitted
      </div>
    )
  }

}

export default ErrorPage;