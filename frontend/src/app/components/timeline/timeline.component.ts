import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, HostListener, OnChanges } from '@angular/core';
import { Module, Subject } from '../../models/model.model';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as jsPlumb from 'jsplumb';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatButtonModule, MatIconModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit, OnChanges {
    @Input() modules: Module[] = [];
    @Output() selectSubject = new EventEmitter<Subject>();

    @ViewChild('timelineContainer', { static: false }) timelineContainer!: ElementRef;
    
    private jsPlumbInstance!: jsPlumb.jsPlumbInstance;

    ngAfterViewInit() {
        this.jsPlumbInstance = jsPlumb.jsPlumb.getInstance({
            Container: this.timelineContainer?.nativeElement || undefined
        });

        if (this.jsPlumbInstance) {
            setTimeout(() => this.createConnections(), 500);
        }

        this.onScroll();
    }

    ngOnChanges() {
        setTimeout(() => {
            this.clearConnections(); 
            this.createConnections(); 
            this.onScroll();  
        }, 500);
    }

    @HostListener('window:scroll', [])
    onScroll() {
        const elements = document.querySelectorAll('.timeline-item, .subject');

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    }

    createConnections() {
        if (window.innerWidth <= 768) return;
        if (!this.jsPlumbInstance) return;

        this.modules.forEach((module, i) => {
            const moduleId = `module-${i}`;
            const isRightSide = i % 2 === 0;

            if (!document.getElementById(moduleId)) return;

            module.subjects.forEach((subject, j) => {
                const subjectId = `subject-${i}-${j}`;

                if (!document.getElementById(subjectId)) return;

                this.createConnection(subjectId, moduleId, isRightSide);
            });
        });
    }

    createConnection(sourceId: string, targetId: string, isRightSide: boolean) {
        this.jsPlumbInstance.connect({
            source: sourceId,
            target: targetId,
            anchors: isRightSide ? ['LeftMiddle', 'RightMiddle'] : ['RightMiddle', 'LeftMiddle'],
            connector: ['Bezier', { curviness: 50 }],
            endpoints: ['Blank', 'Blank'],
            paintStyle: { 
                stroke: '#4682b4',
                strokeWidth: 2,
                dashstyle: '2 2'
            },
        } as any);
    }

    clearConnections() {
        if (!this.jsPlumbInstance) return;
        this.jsPlumbInstance.deleteEveryConnection();
        this.jsPlumbInstance.reset();
    }

    refreshConnections() {
        this.clearConnections();
        setTimeout(() => this.createConnections(), 500);
    }

    onSubjectClick(subject: Subject) {
        this.selectSubject.emit(subject);
    }
}
