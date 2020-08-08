import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

const TeacherForm: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');



  const [scheduleItem, setScheduleItem] = useState([
    {
      week_day: '',
      from: '',
      to: ''
    }
  ]);

  function addNewScheduleItem() {
    setScheduleItem([
      ...scheduleItem,
      {
        week_day: '',
        from: '',
        to: ''
      }
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItem.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItem(updatedScheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItem
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/');
    }).catch(() => {
      alert('Error')
    })


  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input label="Nome Completo" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <Input label="Avatar" name="avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
            <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
            <Textarea label="Biografia" name="bio" value={bio} onChange={(e) => { setBio(e.target.value) }} />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => { setSubject(e.target.value) }}
              options={[
                { value: 'Programação', label: 'Programação' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
              ]} />
            <Input label="Custo da sua hora por aula" name="cost" value={cost} onChange={(e) => { setCost(e.target.value) }} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
            </legend>

            {
              scheduleItem.map((item, index) => {
                return (
                  <div key={item.week_day} className="schedule-item">
                    <Select
                      label="Dia da semana"
                      name="week_day"
                      value={item.week_day}
                      onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                      options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terça-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sábado' },
                      ]} />
                    <Input name="from" label="Das" type="time" value={item.from} onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)} />
                    <Input name="to" label="Até" type="time" value={item.to} onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)} />
                  </div>
                );
              })
            }

          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;