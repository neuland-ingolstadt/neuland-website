import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon
} from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex flex-row items-center gap-2', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
	size?: 'default' | 'sm' | 'lg' | 'icon'
} & React.ComponentProps<'a'>

function PaginationLink({
	className,
	isActive,
	size = 'icon',
	...props
}: PaginationLinkProps) {
	const sizeClasses = {
		default: 'h-10 px-4',
		sm: 'h-9 px-3',
		lg: 'h-11 px-8',
		icon: 'h-10 w-10'
	}

	return (
		<a
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 no-underline relative group overflow-hidden',
				sizeClasses[size],
				isActive
					? 'border border-terminal-cyan/40 bg-terminal-card text-terminal-cyan hover:border-terminal-cyan/60 hover:bg-terminal-card'
					: 'border border-terminal-window-border bg-terminal-card text-terminal-text/70 hover:border-terminal-highlight/40 hover:text-terminal-text hover:bg-terminal-window',
				className
			)}
			{...props}
		>
			{/* Subtle hover glow for active items */}
			{isActive && (
				<div className="absolute inset-0 bg-terminal-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
			)}
			<span className="relative z-10">{props.children}</span>
		</a>
	)
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn(
				'gap-2 px-3 sm:pl-3 no-underline flex items-center',
				className
			)}
			{...props}
		>
			<ChevronLeftIcon className="shrink-0" />
		</PaginationLink>
	)
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn(
				'gap-2 px-3 sm:pr-3 no-underline flex items-center',
				className
			)}
			{...props}
		>
			<ChevronRightIcon className="shrink-0" />
		</PaginationLink>
	)
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn(
				'flex h-10 w-10 items-center justify-center text-terminal-text/60',
				className
			)}
			{...props}
		>
			<MoreHorizontalIcon className="size-4" />
			<span className="sr-only">More pages</span>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationLink,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis
}
