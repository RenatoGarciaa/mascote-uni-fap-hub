import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const MascotForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    curso: "",
    matricula: "",
    turno: "",
    telefone: "",
    email: "",
    nomeMascote: "",
    arquivo: null as File | null,
    justificativa: "",
    concordoTermos: false,
    declaroOriginalidade: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      'nome', 'curso', 'matricula', 'turno', 'telefone', 'email', 
      'nomeMascote', 'arquivo', 'justificativa'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.concordoTermos || !formData.declaroOriginalidade) {
      toast({
        title: "Declarações obrigatórias",
        description: "Por favor, marque todas as declarações obrigatórias.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = new FormData();
      payload.append("nome", formData.nome);
      payload.append("curso", formData.curso);
      payload.append("matricula", formData.matricula);
      payload.append("turno", formData.turno);
      payload.append("telefone", formData.telefone);
      payload.append("email", formData.email);
      payload.append("nomeMascote", formData.nomeMascote);
      payload.append("justificativa", formData.justificativa);
      payload.append("concordoTermos", formData.concordoTermos ? "true" : "false");
      payload.append("declaroOriginalidade", formData.declaroOriginalidade ? "true" : "false");

      if (formData.arquivo) {
        payload.append("arquivo", formData.arquivo);
      }

      const webhookURL = "https://seu-webhook-url.com"; // Substitua pela URL real do seu webhook

      const response = await fetch(webhookURL, {
        method: "POST",
        body: payload
      });

      if (response.ok) {
        toast({
          title: "Inscrição enviada com sucesso! 🎉",
          description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
        });
      } else {
        throw new Error("Erro ao enviar para o webhook");
      }
    } catch (error) {
      toast({
        title: "Erro no envio",
        description: "Houve um problema ao enviar seus dados. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('png') && !file.type.includes('pdf')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PNG ou PDF.",
          variant: "destructive",
        });
        return;
      }
      setFormData({ ...formData, arquivo: file });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📝 Formulário de Inscrição – Concurso do Mascote UniFAP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Nome completo</Label>
            <Input value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
          </div>
          <div>
            <Label>Curso</Label>
            <Input value={formData.curso} onChange={(e) => setFormData({ ...formData, curso: e.target.value })} />
          </div>
          <div>
            <Label>Número de matrícula</Label>
            <Input value={formData.matricula} onChange={(e) => setFormData({ ...formData, matricula: e.target.value })} />
          </div>
          <div>
            <Label>Turno</Label>
            <RadioGroup value={formData.turno} onValueChange={(turno) => setFormData({ ...formData, turno })}>
              <div><RadioGroupItem value="manha" id="manha" /><Label htmlFor="manha">Manhã</Label></div>
              <div><RadioGroupItem value="noite" id="noite" /><Label htmlFor="noite">Noite</Label></div>
              <div><RadioGroupItem value="ead" id="ead" /><Label htmlFor="ead">EAD</Label></div>
              <div><RadioGroupItem value="semipresencial" id="semi" /><Label htmlFor="semi">Semipresencial</Label></div>
            </RadioGroup>
          </div>
          <div>
            <Label>Telefone para contato (WhatsApp)</Label>
            <Input value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div>
            <Label>Nome do Mascote</Label>
            <Input value={formData.nomeMascote} onChange={(e) => setFormData({ ...formData, nomeMascote: e.target.value })} />
          </div>
          <div>
            <Label>Arquivo da Proposta (PNG ou PDF)</Label>
            <Input type="file" accept=".png,.pdf" onChange={handleFileChange} />
          </div>
          <div>
            <Label>Justificativa</Label>
            <Textarea value={formData.justificativa} onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="termos" checked={formData.concordoTermos} onCheckedChange={(checked) => setFormData({ ...formData, concordoTermos: Boolean(checked) })} />
            <Label htmlFor="termos">Declaro que li e estou de acordo com o regulamento.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="originalidade" checked={formData.declaroOriginalidade} onCheckedChange={(checked) => setFormData({ ...formData, declaroOriginalidade: Boolean(checked) })} />
            <Label htmlFor="originalidade">Declaro que a proposta é original e de minha autoria.</Label>
          </div>
          <Button type="submit">Enviar informações</Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default MascotForm;
