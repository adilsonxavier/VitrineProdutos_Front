import React from "react";

export default function ProdutoForm() {

    const initialFieldValues = {
        produtoId: "0",
        produtoNome: "",
        produtoDescricao: "",
        produtoValor: "0"
    }

    const [values, setValues] = React.useState(initialFieldValues);

    //React.useEffect(() => {
    //    setValues(initialFieldValues);

    //}, []);

    const handleInputChange = e => {
        // const [name, value] = e.target;
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }

        );
        console.log(values);

    }
    const applyErrorClass = (field) => {
      //  return (field in errors && errors[field] == false) ? " invalid-field" : ""
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("47");
        //if (validate()) {
        //    const formData = new FormData();
        //    formData.append("employeeId", values.employeeId);
        //    formData.append("employeeName", values.employeeName);
        //    formData.append("occupation", values.occupation);
        //    formData.append("imageName", values.imageName);
        //    formData.append("imageFile", values.imageFile);

        //    addOrEdit(formData, resetForm);


        //    console.log("ok 97")
        //}
        //else {
        //    console.log("n ok")
        //}
    }

    return (
  
        <div >
            <h1>Produto form</h1>
            <form onSubmit={handleFormSubmit}>
                <div >

                    <input type="text" name="produtoNome"
                        value={values.produtoNome}
                    onChange={handleInputChange}
                    placeholder="produto nome"
                    className={"form-control" + applyErrorClass("produtoName")}
                                />


                    <input type="text" name="produtoDescricao"
                        value={values.produtoDescricao}
                        onChange={handleInputChange}
                        placeholder="descricao"
                    />

                    <input type="text" name="produtoValor"
                        value={values.produtoValor}
                        onChange={handleInputChange}
                        placeholder="valor"
                    />
                    <button type="submit">Submit</button>

                </div>
            </form>
        </div >
       
        );

}