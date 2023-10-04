import { useState } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './Componentes/Input'
import Button from './Componentes/Button'
import Balance from './Componentes/Balance'

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`

const Section = styled.section`
  background-color: #eee;
  border-top: solid 2px palevioletred;
  padding: 20px 25px;
  width: 500px;
  box-shadow: 0px 2px 3px rgb(0,0,0,0.3);
`

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
// object is a function that receives a configuration object, which are the properties that my object must have to pass
// validation
// With typeError it allows us to change the message displayed
          validationSchema={Yup.object({
            deposit: Yup.number().required('Mandatory').typeError('It must be a number'),
            contribution: Yup.number().required('Mandatory').typeError('It must be a number'),
              years: Yup.number().required('Mandatory').typeError('It must be a number'),
            rate: Yup
              .number()
              .required('Mandatory')
              .typeError('It must be a number')
              .min(0, 'The minimum value is 0')
              .max(1, 'The maximum value is 1'),
          })}
          >

          <Form>
            <Input name="deposit" label="Initial deposit" />
            <Input name="contribution" label="Annual contribution" />
            <Input name="years" label="Years" />
            <Input name="rate" label="Estimated interest"/>
            <Button>Calculate</Button>
          </Form>
        </Formik>

        {balance !== '' ? <Balance>Final balance: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
