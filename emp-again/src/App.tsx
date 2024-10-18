import { useRef,useEffect ,useState } from 'react'
import './App.css'
import Department from './Department'; 
import { IEducation, iEmployee } from './interfaces/employee';
import { IDepartment } from './interfaces/department';

function App() {
  const[firstname,setFirstname]=useState('');
  const[lastname,setLastname]=useState('');
  const[email,setEmail]=useState('');
  const[address,setAddress]=useState('');
  const[phone,setPhone]=useState('');
  let  [departmentId,setDepartmentId]=useState(0)
  const[employee,setEmployee]=useState<iEmployee[]>([]);
  const[formMode,setFormMode]=useState(0)
  const id =useRef<number>(0)
  const [editId, setEditId] = useState<number>(0);
  const [departmentData,setDepartmentData]=useState<IDepartment[]>([])
  //--------education usestate()-----------//
  const [level, setLevel] = useState('');
  const [passingYear, setPassingYear] = useState(0);
  const [percentage, setPercentage] = useState(0);
  let educationId =useRef<number>(0)
  const [education, setEducation] = useState<IEducation[]>([]);

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
  //save and edit//
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
          departmentId,
          education:[]
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
  //--------------------------------education--------------------//
  const educationbutton=(_education: IEducation[])=>{
    setFormMode(5)
  }

  //add education button//
  const addedu=()=>{
    setFormMode(6)
  }

//back education//
const backedu=()=>{
    setFormMode(5)
}
const Saveeducation=()=>{
 if(level&&passingYear&&percentage){
  if(formMode==6){
    const obj:IEducation={
      educationId:educationId.current,
      level,
      passingYear,
      percentage,
    }
    educationId.current++
    const newsave=[...education,obj]
    setEducation(newsave)
  }

 }
 setFormMode(5)
}
//--------------------Return-------------------------------------//
return (
  <div className='main'>
    {/* nav bar for all mangement system */}
    <div className='nav-bar'>
        <i className="fa-solid fa-house home"onClick={homebutton}></i>
        <div className='emp'>
          <button type='button' className='btn btn-success info'onClick={adddepartmentbutton}>
          <i className={formMode==0?'fas fa-graduation-cap':"fa-solid fa-circle-left"}></i>
         {formMode ===0?'Manage-department':'Back To Main'}
          </button>
          <i className="fa-solid fa-user"></i>
          Employee management
       </div> 
    </div>
    {/* department Component*/}
    <div className={formMode===4?'containe':'containe d-none'}>
    <Department></Department>
    </div>
    {/*employee add-form */}
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
    {/* employee table */}
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
          <i className="fas fa-graduation-cap action-icon3"onClick={()=>educationbutton(e.education)}>EDU</i>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
      </div>
    </div>
     {/* educaton form */}
    <div className={formMode === 6 || formMode === 7 ? 'container' : 'container d-none'}>
      <div className="header">
        <h2 className={formMode==6?'new':'new d-none'}>Education</h2>
        <h2 className={formMode==7?'update':'update d-none'}>Update Education</h2>
        <button className="back-btn" onClick={backedu}>BACK</button>
      </div>
        <form className="employee-form">
        <label htmlFor="level">
        Level<span>*</span>
      </label>
      <select 
      defaultValue={0}
      name="level" 
      id="level" 
      value={level}
      onChange={(e:any)=>setLevel(e.target.value)}>
        <option value="0" disabled>select level</option>
        <option value="Matric">Matric</option>
        <option value="FSc">FSc</option>
        <option value="ICS">ICS</option>
        <option value="BSc">BSc</option>
        <option value="BS">BS</option>
        <option value="MS">MS</option>
      </select>

        <label htmlFor="passing year">
          Passing Year <span>*</span>
        </label>
        <input type="text" 
          id="passingyear" 
          value={passingYear}
          onChange={(e:any)=>setPassingYear(e.target.value)}
        />

      <label htmlFor="percentage">
          percentage <span>*</span>
        </label>
        <input type="text" 
          id="percentage" 
          value={percentage}
          onChange={(e:any)=>setPercentage(e.target.value)}
        />
        <button 
      type="button"
      className="submit-btn" 
      onClick={Saveeducation}
      >
        Save
      </button>
        </form>
    </div>
    {/* education table */}
    <div className={formMode==5?'table-container':'table-container d-none'}>
      <div className='header'>
        <h2>Degree Of{firstname}</h2>
        <button className='add-btn' onClick={addedu}>
          <i className="fa-solid fa-plus"></i> ADD
        </button>
      </div>
      <table className='employee-table table table-bordered'>
    <thead>
      <tr>
        <th>EducationId</th>
        <th>Level</th>
        <th>passing year</th>
        <th>percentage</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody className='table-group-divider'>
      {education.map((e:IEducation)=>(
        <tr className='table' key={e.educationId}>
        <td>{e.educationId}</td>
        <td>{e.level}</td>
        <td>{e.passingYear}</td>
        <td>{e.percentage}</td>
        <td className='ICON'>
          <i className="fa-solid fa-pen action-icon1"onClick={()=>editbutton(e.educationId)}></i>
          <i className="fa-solid fa-trash action-icon2" onClick={()=>deletebutton(e.educationId)}></i>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
    </div>
   
  </div>
)
}

export default App


