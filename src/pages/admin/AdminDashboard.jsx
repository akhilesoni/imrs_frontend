import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../../style/dashboardStyle/panel.css"
import { TOKEN, URL, USER } from "../../utilities/Constants"
import { LineChart,AreaChart,Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../../style/dashboardStyle/overview.css"
import "../../style/dashboardStyle/overview.css"
import Invoice from "../../components/dashboard/Invoice"
import { useState } from "react"
export default function AdminDashboard(){
    const [invoice, setInvoice] = useState(null)
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem(USER))
    const [charFilter,setChartFilter] = useState(5);
    const [totalAmount,setTotalAmount]  = useState(0)
    const [totalReceivedAmount,setTotalReceivedAmount]  = useState(0)
    const [totalPendingAmount,setTotalPendingAmount]  = useState(0)

    
const data1 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

    const fetchOverviewData = () => {
      fetch(URL + 'overview_admin',{
        method:'post',
        body:JSON.stringify({
          token:localStorage.getItem(TOKEN),
        }),
        headers:{
          'Content-type':'application/json'
        }
      }).then(res => res.json()).then(data => {
        if(data.isValid){
          setData((data.chartData.filter((obj) => obj.accepted)).map((obj1)=>({
            name:'',
            uv:obj1.amount,
            amt:obj1.amount
          })))
          var amt = 0,pamt = 0, ramt =0;
          for (let i = 0; i < data.chartData.length; i++) {
            const obj = data.chartData[i];
            amt = parseInt(amt) + parseInt(obj.amount)
            if(!obj.accepted){
              pamt = parseInt(pamt) + parseInt(obj.amount)
            }else{
              ramt = parseInt(ramt) + parseInt(obj.amount)

            }

          }
          setInvoice(data.invoice)
          setTotalPendingAmount(pamt)
          setTotalReceivedAmount(ramt)
          setTotalAmount(amt)
        }else{
          navigate('/')
        }
      })
    }

    useEffect(() => {
      fetchOverviewData();
    },[])
    return (
        <div className="dashboard-panel">
            <div className="greet-panel">
                <div className="greet-text">
                    <p className="greet-b">Hello,</p>
                    <p className="greet-m">{currentUser.name}.</p>
                </div>
                <div className="c1"></div>
                <div className="c2"></div>
                <div className="c3"></div>
            </div>
            <div className="top-wrapper">
                <div className="top-left">
                    <p style={{textAlign:'left'}} className="t-m">Payments</p>
                    <div className="border-bottom"></div>
                    <div className="value-wrapper">
                        <div>
                            <p className="t-b">	&#8377;{totalAmount}</p>
                            <p className="t-s">Total Amount</p>
                        </div>
                        <div>
                            <p className="t-b">&#8377;{totalReceivedAmount}</p>
                            <p className="t-s">Total Received</p>
                        </div>
                        <div>
                            <p className="t-b">&#8377;{totalPendingAmount}</p>
                            <p className="t-s">Total Pending</p>
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    width={500}
                    height={400}
                    data={charFilter === 'a'? data1 : data1.slice(0,charFilter) }
                    >
                    <XAxis fontFamily="monospace" strokeWidth={0}  stroke="#3152be" tickMargin={15}/>
                    <Area strokeWidth={2} type="monotone" dataKey="uv" stroke="#3152be" fill="#359add49" />
                    </AreaChart>
                </ResponsiveContainer>
               
            </div>
            {charFilter==='a'?<p className="legend">All transactions</p>:<p className="legend">last {charFilter} transactions</p>}

            <div className="filter-wrapper">
              <p onClick={() => setChartFilter(5)} className={charFilter === 5 ? "f-i-a" : "f-i"}>5</p>
              <p onClick={() => setChartFilter(10)} className={charFilter === 10 ? "f-i-a" : "f-i"}>10</p>
              <p onClick={() => setChartFilter(20)} className={charFilter === 20 ? "f-i-a" : "f-i"}>20</p>
              <p onClick={() => setChartFilter('a')} className={charFilter === 'a' ? "f-i-a" : "f-i"}>ALL</p>
            </div>
            <div className="recent-wrapper">
              <div className="recent-invoice">
                  {invoice === null ? 
                    ''
                    :
                    <div className="recent">
                      
                    </div>
                  
                  }
              </div>
              <div className="recent-issue">

              </div>
              <div className="recent-reconciliation">

              </div>
            </div>
        </div>
    )
}