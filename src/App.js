import React,{ useState, useEffect, useCallback } from 'react';
import './App.css';
import moment from 'moment/moment';

function App() {
  const [stateDataSource, setStateDataSource ] = useState();

  useEffect(() => {
    fetch('https://systemjs.1688.com/krump/schema/1352.json').then(function(data){
      return data.json();
    }).then(function(dataSource){
        setStateDataSource(dataSource.list.slice(0,4));
    });
  },[])

  const getTime=useCallback((value) => {
      let hour=parseInt(value/3600) < 10 ? "0"+ parseInt(value/3600) : parseInt(value/3600);
      let min=parseInt((value%3600)/60) < 10 ? "0"+ parseInt((value%3600)/60) : parseInt((value%3600)/60);
      let second=(value%3600)%60 < 10 ? "0"+(value%3600)%60 : (value%3600)%60;
      if(value > 0){
        let times=value-1;
        setInterval(function (){
          getTime(times);
        }, 1000);
      }
      return hour+':'+min+':'+second;
  },[])

const getDate = (time) => {
  return moment(time[0]).format('MM-DD HH:mm')+"-"+moment(time[1]).format('MM-DD HH:mm')
}
  return (
    <div className="App">    
      <div>
        <div style={{size: '32px', marginTop: '5px', fontFamily: 'PingFang SC', fontWeight: 'bold'}}>1688进货红包</div>
        {stateDataSource && stateDataSource.map(item => {
          return (
            <div key={item.id} style={{ marginTop: '22px'}}>
              <div className='module'>
                <div className='money'>{item.money}</div>
                <div className='yuan'>元</div>
                <div className='title'>
                  <div className='big-title'>{item.title}</div>
                  <div className='description'>{item.description}</div>
                  <div className='show-time'>
                    <div className='time'>{item.restTime?"距结束":"有效期:"}</div>
                    <div className='date'>{item.restTime ?getTime(item.restTime):getDate(item.time)}</div>
                  </div>
                </div>
                <div className='status'>{item.status}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
