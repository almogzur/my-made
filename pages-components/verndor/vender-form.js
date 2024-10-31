import  { useContext, useEffect, useState } from "react";
import { StateContext } from '../../context';
import { useSession } from "next-auth/react";
import Colors from '../../lib/colors'
import { m, LazyMotion } from 'framer-motion';
import f from '../../lib/features';
import useUser from '../../lib/hooks/useUser'
import LoadingSpinner from "../../components/my-spinner/loading-spinner";
import { Input,Textarea } from "@chakra-ui/react"
import { Field } from "../../components/ui/field"


const descriptionPlaceholder = 
` דוגמה : המחיר הוא עבור 1 2 3  
 דוגמה: מבצע/ת את כאשר אין אנשים ביית 
  פרטים נוספים ...
  `;

 const STATE_KEY = "Vendor";


const VendorForm = ({ setEdit }) => {

  const { data: session, status } = useSession();
  const { user , isLoading , isError } = useUser(session?.user?.email)
  const [ state, setState ] = useContext(StateContext);
  const [ConIsFetching , setComIsFetching] = useState(false)


    const Style = {
        Wrapper:  {   
           background:"#fff",
           padding:"20px"
         },    
       headelinStyle : { 
           textAlign:"center",
           fontSize:"1.5em"
        },

    }

  //  toogel to render back the form 
  // Update state from db 
   useEffect(() => {
    if (!isLoading && !isError && user) {
     // console.log("Vendor form effect - user data:", user);
  
      const businessName = user?.state?.[STATE_KEY]?.BussniseName || '';
      const price = user?.state?.[STATE_KEY]?.price || '';
      const description = user?.state?.[STATE_KEY]?.description || '';
     
      setState(prevState => ({
        ...prevState,
        [STATE_KEY]: {
          ...prevState[STATE_KEY],
          BussniseName: businessName,
          price: price,
          description: description,
        }
      }));
    }
  }, [user, setState, isLoading, isError]);
  
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
   
 //  e.preventDefault()
   // setEdit(true)
    try {
      setComIsFetching(true)
      e.preventDefault()
      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state[STATE_KEY])
      });
      if (response.ok) {
        setTimeout(()=>{  setComIsFetching(false)} ,3000)

        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } 
    catch (error) {
      console.error('Error updating profile:', error);
    }

  };


  if (status==="loading" || isLoading || ConIsFetching  ){
    return <LoadingSpinner />
  }

 return (
      <form 
         style={Style.Wrapper}
         onSubmit={handleSubmit}
         >
        <h3 style={Style.headelinStyle}>{`הרשם כנותן שירות משק`}</h3>


        <Field  label="שם" required helperText="שם שיופיע במערכת  " >
           <Input  
                variant={"subtle"}
                 required
                 value={state[STATE_KEY].BussniseName} 
                 id="BussniseName"
                 onChange={handleChange}  

                 />
        </Field>

        <Field label="מחיר   " required helperText=" מחיר לעשת עבודה" >
           <Input variant={"subtle"}  type="number" required  onChange={handleChange} id="price"  />
        </Field>

        <Field  label="טלפון " required helperText=" יוצג ללקוח רק לאחר הסכמה  " >
           <Input variant={"subtle"}  type="number" required  onChange={handleChange} id="phone"  />
        </Field>

        <Field label="תיאור ">
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

         <LazyMotion features={f}>
            <m.button
            type="submit"
            style={{
              height: "60px",
              width: '150px',
              border: "1px solid",
              borderRadius: "3px",
              background: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              textAlign: "center",
              color: Colors.text,
              boxShadow: `3px 3px 3px 3px ${Colors.d}`,
            }}
            whileHover={{
              boxShadow: `3px 3px 3px inset`,
            }}
          >
          הרשמה
            </m.button>
          </LazyMotion>

      </form>

  );
};

export default VendorForm;
