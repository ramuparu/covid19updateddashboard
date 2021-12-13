import './index.css'

const FaqItems = props => {
  const {eachFaq} = props
  const {answer, question} = eachFaq
  return (
    <li className="faq_list_card">
      <p className="question_para">{question}</p>
      <h1 className="answer_para">{answer}</h1>
    </li>
  )
}

export default FaqItems
