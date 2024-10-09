import { useRef,useEffect ,useState } from 'react'
import './App.css'
import Department from './Department'; 
import { iEmployee } from './interfaces/employee';
import { IDepartment } from './interfaces/department';

function App() {
  const[firstname,setFirstname]=useState('');
  const[lastname,setLastname]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[phone,setPhone]=useState('');
  let [departmentId,setDepartmentId]=useState(0)
  const[employee,setEmployee]=useState<iEmployee[]>([]);
  const[formMode,setFormMode]=useState(0)
  const id =useRef<number>(0)
  const [editId, setEditId] = useState<number>(0);
  const [departmentData,setDepartmentData]=useState<IDepartment[]>([])
  //get departement data from local storage//
  useEffect(()=>{
    if(localStorage.getItem('dep')){
      var old_data= JSON.parse(localStorage.dep)
      setDepartmentData(old_data)
    }
  },[])



  //get employee old data from local storage//
  useEffect(()=>{
    const storedData=localStorage.getItem('emp')
    if(storedData){
      var oldData=JSON.parse(storedData)
      setEmployee(oldData)
      let lastId = 0;
      oldData.map((o:iEmployee) => {
        if (o.id > lastId) {
          lastId = o.id;
        }
      });
  
      id.current = lastId + 1;
    }
  },[])
  //home-button//
  const homebutton=()=>{
    if(formMode!==0){
      setFormMode(0)
    }
  }
  //add//
  const add=()=>{
    if(formMode==0){
      setFormMode(1)
    }
  }
  //back//
  const back=()=>{
    if(formMode!==0){
      setFormMode(0)
    }
  }
  
  const save=()=>{
    //new-save//
    if(firstname && lastname && email && address && phone){
      if(formMode==1){
        const obj={
          id:id.current,
          firstname,
          lastname,
          email,
          address,
          phone,
          departmentId
        }
        id.current++
        const newsave=[...employee,obj]
        setEmployee(newsave)
        localStorage.setItem('emp',JSON.stringify(newsave))
        //edit//
      }else if(formMode==2){
        let index:any;
        employee.map((e,i)=>{
          if (e.id==editId){
           index=i
          }
        })
       employee[index].firstname=firstname;
       employee[index].lastname=lastname;
       employee[index].email=email;
       employee[index].address=address
       employee[index].phone=phone
       employee[index].departmentId=departmentId
      setEmployee([...employee])
      localStorage.setItem('emp',JSON.stringify(employee))
      }
    }
    setFirstname('')
    setLastname('')
    setEmail('')
    setAddress('')
    setPhone('')
    
    setFormMode(0)
    setEditId(0); 
  }
  //edit EMPLOyee//
  const editbutton =(id:number)=>{
   employee.map((e)=>{
    if(e.id==id){
    setFirstname(e.firstname)
    setLastname(e.lastname)
    setEmail(e.email)
    setAddress(e.address)
    setPhone(e.phone)
    setDepartmentId(e.departmentId)
    setFormMode(2)
    setEditId(id);
    }
   })
   
   
  }
  //delete employEE//
  const deletebutton =(id:number)=>{
    let index:any;
    employee.map((e,i)=>{
      if(e.id ===id){
        index=i
      }
    })
    employee.splice(index,1)
    setEmployee([...employee])
    localStorage.setItem('emp',JSON.stringify(employee))
  }
  //----SHOW department coMPONnt------------//
  const adddepartmentbutton=()=>{
      if(formMode==0){
        setFormMode(4)
      }else{
        setFormMode(0)
      }
  }
  //PRINT DEPARTMENT IN TABLE//
  const printdepartment=(id:number)=>{
    let depname:String=''
    departmentData.map((d)=>{
      if(d.id==id){
        depname=d.name
      }
    })
    return depname;
  }



return (
  <div className='main'>
    {/* NAV-bAR */}
    <div className='nav-bar'>
        <i className="fa-solid fa-house home"onClick={homebutton}></i>
        <div className='emp'>
          <button type='button' className='btn btn-success info'onClick={adddepartmentbutton}>
          <i className="fas fa-graduation-cap"></i>
         {formMode ===0?'Manage-department':'Back to main'}
          </button>
          <i className="fa-solid fa-user"></i>
          Employee management
       </div> 
    </div>
    {/* department COMponeNT*/}
    <div className={formMode===4?'containe':'containe d-none'}>
    <Department></Department>
    </div>
    {/* add-form */}
    <div className={formMode === 1 || formMode === 2 ? 'container' : 'container d-none'}>
      <div className="header">
        <h2 className={formMode==1?'new':'new d-none'}>New Employee</h2>
        <h2 className={formMode==2?'update':'update d-none'}>Update Employee</h2>
        <button className="back-btn" onClick={back}>BACK</button>
      </div>
        <form className="employee-form">
        <label htmlFor="first-name">
          First Name <span>*</span>
        </label>
        <input type="text" 
          id="first-name" 
          value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}
        />
      
        <label htmlFor="last-name">
          Last Name <span>*</span>
        </label>
      <input type="text" id="last-name" 
 
      value={lastname}
      onChange={(e)=>setLastname(e.target.value)}
      />
      
      <label htmlFor="email">
        Email <span>*</span>
      </label>
      <input 
      type="email" 
      id="email" 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      
      <label htmlFor="address">
        Address <span>*</span>
      </label>
      <textarea 
        id="address" 
        value={address}
        onChange={(e)=>setAddress(e.target.value)}>
      </textarea>
      
      <label htmlFor="phone">
        Phone <span>*</span>
      </label>
      <input 
      type="text" 
      id="phone" 
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      />

       <label htmlFor="DEPARTMENT">
        Department<span>*</span>
      </label>
      <select 
      defaultValue={0}
      name="department" 
      id="department" 
      value={departmentId}
      onChange={(e:any)=>setDepartmentId(e.target.value)}>
        <option value="0" disabled>select department</option>
        {departmentData.map((d)=>(
          <option value={d.id} key={d.id}>
            {d.name}</option>
        ))}
      </select>
      
      <button 
      type="button"
      className="submit-btn" 
      onClick={save}
      >
        Save
      </button>
      </form>
     
  </div>
    {/* table */}
  <div>
  <div className={formMode==0?'table-container':'table-container d-none'}>
    <div className='header'>
    <h2>Manage Employees</h2>
    <button className='add-btn' onClick={add}>
      <i className="fa-solid fa-plus"></i> ADD
    </button>
  </div>
  
  <table className='employee-table table table-bordered'>
    <thead>
      <tr>
      <th>Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody className='table-group-divider'>
      {employee.map((e:iEmployee)=>(
        <tr className='table' key={e.id}>
          <td>{e.id}</td>
        <td>{e.firstname}</td>
        <td>{e.lastname}</td>
        <td>{e.email}</td>
        <td>{e.address}</td>
        <td>{e.phone}</td>
        <td>{printdepartment(e.departmentId)}</td>
        <td className='ICON'>
          <i className="fa-solid fa-pen action-icon1"onClick={()=>editbutton(e.id)}></i>
          <i className="fa-solid fa-trash action-icon2" onClick={()=>deletebutton(e.id)}></i>
          <i className="fas fa-graduation-cap action-icon3" >EDU</i>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
      </div>
    </div>
  </div>
)
}

export default App

