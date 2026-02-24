function FloatingInput({ id, type, value, onChange, placeholder }){
   return (
      <div className="relative">
         <input
         type={type}
         id={id}
         value={value}
         onChange={onChange}
         required
         className="peer w-full border border-gray-300 p-3 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
         placeholder={placeholder}
         />
         <label htmlFor={id} className={`
         absolute left-3 top-3 text-sm text-gray-500 transition-all
         pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
         peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500
         ${value? 'hidden': ''}
         `}>
            {placeholder}
         </label>
      </div>

      // <div className="relative">
      //    <input
      //       type="email"
      //       id="correo"
      //       value={email}
      //       onChange={(e) => setEmail(e.target.value)}
      //       required
      //       className="peer w-full border border-gray-300 p-3 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
      //       placeholder="Correo electrónico"
      //    />
      //    <label
      //       htmlFor="correo"
      //       className={`
      //          absolute left-3 top-3 text-sm text-gray-500 transition-all
      //          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base
      //          peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500
      //          ${email ? 'hidden' : ''}
      //       `}
      //    >
      //       Correo electrónico
      //    </label>
      // </div>
   )
}
export default FloatingInput;