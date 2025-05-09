import React from 'react';

import type { FallbackProps } from 'react-error-boundary';

//
//
//

type ErrorsProps = FallbackProps & React.ComponentProps<'div'>;

//
//
//

const Errors = React.forwardRef<HTMLDivElement, ErrorsProps>(
  ({ ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        error
      </div>
    );
  }
);

Errors.displayName = 'Errors';

export default Errors;
