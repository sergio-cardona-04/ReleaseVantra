import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { plans } from '@/mocks/data';
import { Card, Progress, Select, Alert } from '@/components/ui/primitives';
import { Field } from '@/components/form-fields';
export function MembersPage() {
  const { organization, plan } = useDemo();
  const [email, setEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('DEVELOPER');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  const limit = plans.find((p) => p.name === plan)?.users ?? '5';
  const full = limit !== 'Sin cuota comercial' && organization.users >= Number(limit);
  return (
    <>
      <PageHeading
        title="Miembros"
        description={`${organization.users} miembros de ejemplo · Plan visual ${plan}`}
      />
      <Card>
        <h2>Equipo de {organization.name}</h2>
        <p>Roles representados: administrador, desarrollador, aprobador, operador y auditor.</p>
        <Progress
          label="Consumo ilustrativo de miembros"
          value={
            limit === 'Sin cuota comercial'
              ? 0
              : Math.min(100, Math.round((organization.users / Number(limit)) * 100))
          }
        />
        <p className="muted">
          {organization.users} / {limit} usuarios
        </p>
      </Card>
      <Card className="form-card">
        <h2>Invitar a un miembro</h2>
        {full && (
          <Alert danger>
            El plan visual alcanzó el límite de miembros. No se puede continuar con esta invitación
            conceptual.
          </Alert>
        )}
        <form
          className="form-stack"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setError('Escribe un correo electrónico válido.');
              return;
            }
            setError('');
            setPreview(true);
          }}
        >
          <Field
            label="Correo del destinatario"
            name="email"
            type="email"
            value={email}
            error={error || undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              setPreview(false);
            }}
          />
          <label htmlFor="invite-role">Rol previsto</label>
          <Select
            id="invite-role"
            value={inviteRole}
            onChange={(e) => {
              setInviteRole(e.target.value);
              setPreview(false);
            }}
          >
            {['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </Select>
          <Button type="submit" disabled={full}>
            Ver invitación conceptual
          </Button>
          {preview && !full && (
            <div className="invite-context" role="status">
              <strong>Vista previa · No se creó una invitación</strong>
              <span>
                {email} · {inviteRole}
              </span>
              <p>
                La invitación futura será temporal, de un solo uso y verificará correo y cuota al
                aceptarse.
              </p>
              <Link to="/invite/demo">Explorar aceptación de ejemplo</Link>
            </div>
          )}
        </form>
      </Card>
    </>
  );
}
