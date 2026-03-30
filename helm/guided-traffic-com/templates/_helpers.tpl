{{/*
Expand the name of the chart.
*/}}
{{- define "guided-traffic-com.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "guided-traffic-com.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Chart label
*/}}
{{- define "guided-traffic-com.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "guided-traffic-com.labels" -}}
helm.sh/chart: {{ include "guided-traffic-com.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Backend labels
*/}}
{{- define "guided-traffic-com.backendLabels" -}}
{{ include "guided-traffic-com.labels" . }}
app.kubernetes.io/name: {{ include "guided-traffic-com.name" . }}-backend
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: backend
{{- end }}

{{/*
Backend selector labels
*/}}
{{- define "guided-traffic-com.backendSelectorLabels" -}}
app.kubernetes.io/name: {{ include "guided-traffic-com.name" . }}-backend
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Frontend labels
*/}}
{{- define "guided-traffic-com.frontendLabels" -}}
{{ include "guided-traffic-com.labels" . }}
app.kubernetes.io/name: {{ include "guided-traffic-com.name" . }}-frontend
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: frontend
{{- end }}

{{/*
Frontend selector labels
*/}}
{{- define "guided-traffic-com.frontendSelectorLabels" -}}
app.kubernetes.io/name: {{ include "guided-traffic-com.name" . }}-frontend
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
