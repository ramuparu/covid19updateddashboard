import './index.css'

const FaqItems = props => {
  const {eachFaq} = props
  const {answer, question} = eachFaq
  console.log(answer)

  return (
    <li className="faq_list_card">
      <p className="question_para">{question}</p>
      {answer.includes('<a') === false ? (
        <h1 className="answer_para">{answer} </h1>
      ) : (
        <h1 className="answer_link_para">{answer}</h1>
      )}
    </li>
  )
}

export default FaqItems
