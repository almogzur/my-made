import Link from "next/link";

export default function CostumeLink ({
  href,
  children,
  text,
  linkClassName,
  divClassName
 })
  {
    return (
      <Link 
        href={href}
        className={linkClassName}
           >
        <div className={divClassName} >
           {text}     
           {children}
      </div>
      </Link>
    )
}


