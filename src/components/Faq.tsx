import React from 'react'
import { useState } from 'react';

function Faq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the purpose of the Emergency Alert Application?",
      answer:
        "The application is designed to help users send alerts during emergencies quickly and efficiently. It ensures that the right people are notified in critical situations like natural disasters, medical emergencies, security threats, or any unforeseen event.",
    },
    {
      question: "Who can use the application?",
      answer: "The application is designed for everyone, including individuals, schools, businesses, community organizations, and public safety agencies.",
    },
    {
      question: "Can ZenPay handle transactions in multiple currencies?",
      answer:
        "Yes, ZenPay supports transactions in multiple currencies to ensure seamless international payments.",
    },
    {
      question: "Can the application handle different types of emergencies?",
      answer:
        "Yes, the application supports various emergency scenarios. Alerts can be customized to suit the specific situation, ensuring clear communication.",
    },

  ]
  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };


  return (
    <section className="bg-gray-50 py-12 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-green-500"
          onClick={() => {
            const dialog = document.getElementById('my_modal_1') as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          Send Alert
        </button>


        <dialog id="my_modal_1" className="modal">
          <div className="modal-box text-black">
            <h3 className="font-bold text-red-600 text-lg">Sed Alert!!</h3>
            <p className="py-4">Press buttons to send alert to the specific department</p>
            <div className='grid grid-cols-3 gap-4 text-white'>
              <button className='p-3 outline-none bg-red-600 rounded-2xl'>Medical</button>
              <button className='p-3 outline-none bg-red-600 rounded-2xl'>ICT</button>
              <button className='p-3 outline-none bg-red-600 rounded-2xl'>Security</button>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* If there is a button in the form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-b ${
              index === openQuestion ? "border-gray-300" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full text-left py-4 flex items-center justify-between focus:outline-none"
            >
              <span className="text-gray-900 font-medium">{faq.question}</span>
              <span
                className={`text-gray-500 transform transition ${
                  index === openQuestion ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </button>
            {index === openQuestion && (
              <div className="text-gray-700 text-sm pb-4">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}

export default Faq
