import { useEffect, useRef, useState } from "react"
import { IDepartment } from "./interfaces/department"

function Department(){
 const[name,setName]=useState('')
 const[code,setCode]=useState('')
 const[description,setDescription]=useState('')
 const[department,setDepartment]=useState<IDepartment[]>([])
 const [formmode,setformMode]=useState(0)
 const [editId, setEditId] = useState<number>(0);
 let id=useRef<number>(0)
 //ADD BUTTON//
 const add=()=>{
    if(formmode==0){
        setformMode(1)
    }
 }
 //BACK BUTTON//
 const back=()=>{
    setformMode(0)
 }
 //get old data from localstorage//
 useEffect(()=>{
    const oldData=localStorage.getItem('dep')
    if(oldData){
        const storeddata =JSON.parse(oldData)
        setDepartment(storeddata)
        let lastId=0
        storeddata.map ((s:IDepartment)=>{
            if(s.id > lastId){
                lastId = s.id
            }
        })
        id.current= lastId +1
    }
   
 },[])
 //SAVE DEPARTMENT//
 const save=()=>{
    if(name && code && description){
        if(formmode==1){
            const obj={
                id:id.current,
                name,
                code,
                description
            }
            id.current++
            const newsave=[...department,obj]
            setDepartment(newsave)
            localStorage.setItem('dep',JSON.stringify(newsave))
            setformMode(0)
        }
        if(formmode==2){
            let index:any;
       department.map((d,i)=>{
            if(d.id==editId){
                index=i
            }
        })
        department[index].name=name;
        department[index].code=code
        department[index].description=description
        setDepartment([...department])
        setformMode(0)
        setEditId(0)
        localStorage.setItem('dep',JSON.stringify(department))
        }
    }
    setName('')
    setCode('')
    setDescription('')
}
//edit dePArtment//
 const editbutton=(id:number)=>{
  department.map((d)=>{
    if(d.id==id){
    setName(d.name)
    setCode(d.code)
    setDescription(d.description)
    setformMode(2)  
    setEditId(id)
    }
  })    
 }
//delete department//
 const deletebutton =(id:number)=>{
 let index:any;
 department.map((d,i)=>{
    if(d.id==id){
        index=i
    }
 })
 department.splice(index,1)
 setDepartment([...department])
 localStorage.setItem('dep',JSON.stringify(department))
 }
return(
    <div className="main">
        {/* add-form */}
    <div className={formmode === 1 || formmode === 2 ? 'container' : 'container d-none'}>
      <div className="header">
        <h2 className={formmode==1?'new':'new d-none'}>New Department</h2>
        <h2 className={formmode==2?'update':'update d-none'}>Update Employee</h2>
        <button className="back-btn" onClick={back}>BACK</button>
      </div>
        <form className="employee-form">
        <label htmlFor="name">
          Department Name <span>*</span>
        </label>
        <input type="text" 
          id="first-name" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      
        <label htmlFor="code">
        Department Code <span>*</span>
        </label>
      <input type="text" 
 
      value={code}
      onChange={(e)=>setCode(e.target.value)}
      />
      
      <label htmlFor="description">
        Despription <span>*</span>
      </label>
      <input 
      type="text" 
      
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />

      
      <button 
      type="button"
      className="submit-btn" 
      onClick={save}
      >
        {formmode==1?'Save':'update'}
      </button>
      </form>
     
  </div>
        {/* table */}
        <div>
            <div className={formmode==0?'table-container':'table-container d-none'}>
        <div className='header'>
        <h2>Manage Department</h2>
        <button className='add-btn' onClick={add}>
        <i className="fa-solid fa-plus"></i> ADD
        </button>
    </div>
    
    <table className='employee-table table table-bordered'>
        <thead>
        <tr>
            <th>Id</th>
            <th>dep-Name</th>
            <th>dep-code</th>
            <th>description</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody className='table-group-divider'>
        {department.map((d:IDepartment)=>(
            <tr className='table' key={d.id}>
            <td>{d.id}</td>
            <td>{d.name}</td>
            <td>{d.code}</td>
            <td>{d.description}</td>
            <td className='ICON'>
             <i className="fa-solid fa-pen action-icon1"onClick={()=>editbutton(d.id)}></i>
            <i className="fa-solid fa-trash action-icon2" onClick={()=>deletebutton(d.id)}></i> 
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
export default Department
