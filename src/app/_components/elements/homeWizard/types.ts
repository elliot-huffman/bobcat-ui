'use client';

export interface SlotClassName {
    className?: string;
}

export interface IntroStepCardSlots {
    actions?: SlotClassName;
    description?: SlotClassName;
    eyebrow?: SlotClassName;
    logo?: SlotClassName;
    logoContainer?: SlotClassName;
    root?: SlotClassName;
    statusBadge?: SlotClassName;
    title?: SlotClassName;
}

export interface InputStepCardSlots {
    actions?: SlotClassName;
    description?: SlotClassName;
    eyebrow?: SlotClassName;
    fileInput?: SlotClassName;
    fileInputLabel?: SlotClassName;
    fileUploadStatus?: SlotClassName;
    firstInput?: SlotClassName;
    firstLabel?: SlotClassName;
    inputStack?: SlotClassName;
    root?: SlotClassName;
    secondInput?: SlotClassName;
    secondLabel?: SlotClassName;
    title?: SlotClassName;
}

export interface OutputStepCardSlots {
    actions?: SlotClassName;
    copyButton?: SlotClassName;
    description?: SlotClassName;
    eyebrow?: SlotClassName;
    outputActions?: SlotClassName;
    outputCodeBlock?: SlotClassName;
    outputCodeContainer?: SlotClassName;
    root?: SlotClassName;
    statusBadge?: SlotClassName;
    title?: SlotClassName;
}

export interface HomeWizardSlots {
    layout?: SlotClassName;
    leftRail?: SlotClassName;
    rightPanel?: SlotClassName;
    root?: SlotClassName;
    sectionCopy?: SlotClassName;
    sectionEyebrow?: SlotClassName;
    sectionTitle?: SlotClassName;
    shell?: SlotClassName;
    stepButton?: SlotClassName;
    stepButtonActive?: SlotClassName;
    stepButtonComplete?: SlotClassName;
    stepDescription?: SlotClassName;
    stepIndex?: SlotClassName;
    stepList?: SlotClassName;
    stepTitle?: SlotClassName;
}

export interface WizardStepDefinition {
    description: string;
    title: string;
}

export interface IntroStepState {
    acknowledged: boolean;
}

export interface InputStepState {
    firstInput: string;
    secondInput: string;
}

export interface OutputStepState {
    copied: boolean;
    outputText: string;
}
