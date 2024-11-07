import  { useContext, useEffect, useState } from "react";
import { StateContext } from '../../context';
import { useSession } from "next-auth/react";
import Colors from '../../lib/colors'
import useUser from '../../lib/hooks/useUser'
import LoadingSpinner from "../../components/my-spinner/loading-spinner";
import { FaPenFancy } from "react-icons/fa";
import { Input,Textarea , Container,Button ,Flex , Heading } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"


const descriptionPlaceholder = 
` דוגמה : המחיר הוא עבור 1 2 3  
 דוגמה: מבצע/ת את כאשר אין אנשים ביית 
  פרטים נוספים ...
  `;

 const STATE_KEY = "Vendor";


const VendorForm = ({ setEdit ,edit }) => {

  const { data: session, status } = useSession();

  const { user , isLoading , isError ,updateUser  } = useUser(session?.user?.email)

  const [ state, setState ] = useContext(StateContext);
  const [IsFetching , setIsFetching] = useState(false)





  
    // api call set isVendor too true 
  const handleChange = (e) => {
   
    const id = e.target.id
    const value = e.target.value


    setState(prevState => ({
        ...prevState,
       [STATE_KEY]: { ...prevState[STATE_KEY], [id]: value },

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
 
    try {
      setIsFetching(true)
     
     
      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY])
      });

      if (response.ok) {
        updateUser()  // When you call mutate(key) (or just mutate() with the bound mutate API) without any data, it will trigger a revalidation
        setTimeout( ()=> setIsFetching(false) ,3000)
      

        
        console.log('Profile updated successfully');
      } 
      else {
        console.error('Failed to update profile');
      }
    } 
    catch (error) {
      console.error('Error updating profile:', error);
    }
    finally{
      setEdit(false)
    }


  };


  if (status==="loading" || isLoading || IsFetching  ){
    return <LoadingSpinner />
  }

 return ( 
      <Flex  p={4} background={"#fff"}   direction={"column"}  justifyContent={"center"}  alignContent={'center'} >
        <form  onSubmit={handleSubmit} >

        <Heading fontSize={"3xl"} p={4} color={Colors.c} textAlign={"center"} >{`הרשם למערכת `}</Heading>


        <Field  p={1}  label="שם" required helperText=" תופיע במערכת בשם זה" >
           <Input 
             
                variant={"subtle"}
                 required
                 value={state[STATE_KEY].name} 
                 id="name"
                 onChange={handleChange}  

                 />
        </Field>

        <Field p={1}  label="מחיר   " required helperText=" מחיר לעשת עבודה" >
           <Input variant={"subtle"}  type="number" required  onChange={handleChange} id="price"  />
        </Field>

        <Field p={1}  label="טלפון " required helperText=" יוצג ללקוח רק לאחר הסכמה  " >
           <Input variant={"subtle"}  type="number" required  onChange={handleChange} id="phone"  />
        </Field>

        <Field p={1} label="תיאור ">
        <Textarea
           id={"description"}
          text={"תיאור"}
          onChange={handleChange}
          placeholder={descriptionPlaceholder}
          resize="none"
           variant={"subtle"}
           rows={3}
        />
        </Field>

        <Flex justifyContent={"center"} >
          <Button bg={Colors.d} m={4} type="submit">
          <FaPenFancy size={"1.5em"}  color={Colors.c}/>{"הרשמה"}
          
          </Button>
         </Flex>

        </form>
      </Flex>

  );
};

export default VendorForm;
